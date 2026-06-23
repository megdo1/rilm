import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// ===== AUTHENTICATION =====

app.post('/make-server-73c2e870/auth/signup', async (c) => {
  try {
    const { email, password, name, role, clientId, organization } = await c.req.json()
    
    // Validate role: platform_admin, client_admin, developer, business
    const validRoles = ['platform_admin', 'client_admin', 'developer', 'business']
    if (!validRoles.includes(role)) {
      return c.json({ error: 'Invalid role' }, 400)
    }
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role, clientId, organization },
      email_confirm: true, // Auto-confirm since email server is not configured
    })
    
    if (error) {
      console.log(`Error creating user during signup: ${error.message}`)
      return c.json({ error: error.message }, 400)
    }
    
    // Store user data in KV store
    await kv.set(`users:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      clientId,
      organization,
      createdAt: new Date().toISOString(),
    })
    
    return c.json({ user: data.user })
  } catch (error) {
    console.log(`Error in signup endpoint: ${error}`)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// ===== CLIENTS =====

app.post('/make-server-73c2e870/clients', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const { name, deploymentMode, allowedLLMs } = await c.req.json()
    
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const clientData = {
      id: clientId,
      name,
      deploymentMode, // SAAS or On-Premise
      allowedLLMs: allowedLLMs || [],
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    }
    
    await kv.set(`clients:${clientId}`, clientData)
    
    return c.json({ client: clientData })
  } catch (error) {
    console.log(`Error creating client: ${error}`)
    return c.json({ error: 'Internal server error while creating client' }, 500)
  }
})

app.get('/make-server-73c2e870/clients', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const clients = await kv.getByPrefix('clients:')
    return c.json({ clients })
  } catch (error) {
    console.log(`Error fetching clients: ${error}`)
    return c.json({ error: 'Internal server error while fetching clients' }, 500)
  }
})

app.get('/make-server-73c2e870/clients/:clientId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const clientId = c.req.param('clientId')
    const client = await kv.get(`clients:${clientId}`)
    
    if (!client) {
      return c.json({ error: 'Client not found' }, 404)
    }
    
    return c.json({ client })
  } catch (error) {
    console.log(`Error fetching client: ${error}`)
    return c.json({ error: 'Internal server error while fetching client' }, 500)
  }
})

// ===== ORGANIZATIONS =====

app.post('/make-server-73c2e870/organizations', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const { clientId, name, type } = await c.req.json()
    
    const orgId = `org_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const orgData = {
      id: orgId,
      clientId,
      name,
      type, // juridique, commercial, RH, marketing, IT, etc.
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    }
    
    await kv.set(`orgs:${orgId}`, orgData)
    
    return c.json({ organization: orgData })
  } catch (error) {
    console.log(`Error creating organization: ${error}`)
    return c.json({ error: 'Internal server error while creating organization' }, 500)
  }
})

app.get('/make-server-73c2e870/organizations', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const clientId = c.req.query('clientId')
    const allOrgs = await kv.getByPrefix('orgs:')
    
    // Filter by clientId if provided
    const organizations = clientId 
      ? allOrgs.filter(org => org.clientId === clientId)
      : allOrgs
    
    return c.json({ organizations })
  } catch (error) {
    console.log(`Error fetching organizations: ${error}`)
    return c.json({ error: 'Internal server error while fetching organizations' }, 500)
  }
})

// ===== AI AGENTS =====

app.post('/make-server-73c2e870/agents', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const { 
      name, 
      description, 
      prompt, 
      code,
      llmModel, 
      clientId, 
      orgId, 
      isPublic,
      type // 'prompt-based' or 'code-based'
    } = await c.req.json()
    
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const agentData = {
      id: agentId,
      name,
      description,
      prompt,
      code,
      llmModel,
      clientId,
      orgId,
      isPublic: isPublic || false,
      type,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    }
    
    await kv.set(`agents:${agentId}`, agentData)
    
    // If public, add to marketplace
    if (isPublic) {
      const marketplace = await kv.get('marketplace:agents') || []
      marketplace.push(agentId)
      await kv.set('marketplace:agents', marketplace)
    }
    
    return c.json({ agent: agentData })
  } catch (error) {
    console.log(`Error creating agent: ${error}`)
    return c.json({ error: 'Internal server error while creating agent' }, 500)
  }
})

app.get('/make-server-73c2e870/agents', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const clientId = c.req.query('clientId')
    const orgId = c.req.query('orgId')
    const allAgents = await kv.getByPrefix('agents:')
    
    // Filter by clientId and orgId
    let agents = allAgents
    if (clientId) {
      agents = agents.filter(agent => agent.clientId === clientId)
    }
    if (orgId) {
      agents = agents.filter(agent => agent.orgId === orgId)
    }
    
    return c.json({ agents })
  } catch (error) {
    console.log(`Error fetching agents: ${error}`)
    return c.json({ error: 'Internal server error while fetching agents' }, 500)
  }
})

app.get('/make-server-73c2e870/agents/:agentId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const agentId = c.req.param('agentId')
    const agent = await kv.get(`agents:${agentId}`)
    
    if (!agent) {
      return c.json({ error: 'Agent not found' }, 404)
    }
    
    return c.json({ agent })
  } catch (error) {
    console.log(`Error fetching agent: ${error}`)
    return c.json({ error: 'Internal server error while fetching agent' }, 500)
  }
})

app.post('/make-server-73c2e870/agents/:agentId/duplicate', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const agentId = c.req.param('agentId')
    const { clientId, orgId } = await c.req.json()
    
    const originalAgent = await kv.get(`agents:${agentId}`)
    
    if (!originalAgent) {
      return c.json({ error: 'Agent not found' }, 404)
    }
    
    // Check if agent is public
    if (!originalAgent.isPublic) {
      return c.json({ error: 'Agent is not public and cannot be duplicated' }, 403)
    }
    
    const newAgentId = `agent_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const newAgentData = {
      ...originalAgent,
      id: newAgentId,
      clientId,
      orgId,
      isPublic: false,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      duplicatedFrom: agentId,
      usageCount: 0,
    }
    
    await kv.set(`agents:${newAgentId}`, newAgentData)
    
    return c.json({ agent: newAgentData })
  } catch (error) {
    console.log(`Error duplicating agent: ${error}`)
    return c.json({ error: 'Internal server error while duplicating agent' }, 500)
  }
})

app.put('/make-server-73c2e870/agents/:agentId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const agentId = c.req.param('agentId')
    const updates = await c.req.json()
    
    const agent = await kv.get(`agents:${agentId}`)
    
    if (!agent) {
      return c.json({ error: 'Agent not found' }, 404)
    }
    
    const updatedAgent = {
      ...agent,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    await kv.set(`agents:${agentId}`, updatedAgent)
    
    return c.json({ agent: updatedAgent })
  } catch (error) {
    console.log(`Error updating agent: ${error}`)
    return c.json({ error: 'Internal server error while updating agent' }, 500)
  }
})

app.post('/make-server-73c2e870/agents/:agentId/execute', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const agentId = c.req.param('agentId')
    const { input } = await c.req.json()
    
    const agent = await kv.get(`agents:${agentId}`)
    
    if (!agent) {
      return c.json({ error: 'Agent not found' }, 404)
    }
    
    // Increment usage count
    agent.usageCount = (agent.usageCount || 0) + 1
    await kv.set(`agents:${agentId}`, agent)
    
    // Simulate agent execution
    const result = {
      agentId,
      input,
      output: `Agent "${agent.name}" executed successfully with input: ${input}`,
      timestamp: new Date().toISOString(),
      llmModel: agent.llmModel,
    }
    
    return c.json({ result })
  } catch (error) {
    console.log(`Error executing agent: ${error}`)
    return c.json({ error: 'Internal server error while executing agent' }, 500)
  }
})

// ===== WORKFLOWS =====

app.post('/make-server-73c2e870/workflows', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const { name, description, clientId, orgId, agentIds, isPublic } = await c.req.json()
    
    const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const workflowData = {
      id: workflowId,
      name,
      description,
      clientId,
      orgId,
      agentIds, // Array of agent IDs in execution order
      isPublic: isPublic || false,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    }
    
    await kv.set(`workflows:${workflowId}`, workflowData)
    
    return c.json({ workflow: workflowData })
  } catch (error) {
    console.log(`Error creating workflow: ${error}`)
    return c.json({ error: 'Internal server error while creating workflow' }, 500)
  }
})

app.get('/make-server-73c2e870/workflows', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const clientId = c.req.query('clientId')
    const allWorkflows = await kv.getByPrefix('workflows:')
    
    const workflows = clientId 
      ? allWorkflows.filter(w => w.clientId === clientId)
      : allWorkflows
    
    return c.json({ workflows })
  } catch (error) {
    console.log(`Error fetching workflows: ${error}`)
    return c.json({ error: 'Internal server error while fetching workflows' }, 500)
  }
})

app.post('/make-server-73c2e870/workflows/:workflowId/execute', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const workflowId = c.req.param('workflowId')
    const { input } = await c.req.json()
    
    const workflow = await kv.get(`workflows:${workflowId}`)
    
    if (!workflow) {
      return c.json({ error: 'Workflow not found' }, 404)
    }
    
    // Execute workflow agents in order
    const results = []
    let currentInput = input
    
    for (const agentId of workflow.agentIds) {
      const agent = await kv.get(`agents:${agentId}`)
      if (agent) {
        results.push({
          agentId,
          agentName: agent.name,
          input: currentInput,
          output: `Agent "${agent.name}" processed: ${currentInput}`,
        })
        currentInput = `Output from ${agent.name}`
      }
    }
    
    return c.json({ workflowId, results, timestamp: new Date().toISOString() })
  } catch (error) {
    console.log(`Error executing workflow: ${error}`)
    return c.json({ error: 'Internal server error while executing workflow' }, 500)
  }
})

// ===== MARKETPLACE =====

app.get('/make-server-73c2e870/marketplace/agents', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const agentIds = await kv.get('marketplace:agents') || []
    const agents = await kv.mget(agentIds.map(id => `agents:${id}`))
    
    return c.json({ agents: agents.filter(a => a !== null) })
  } catch (error) {
    console.log(`Error fetching marketplace agents: ${error}`)
    return c.json({ error: 'Internal server error while fetching marketplace agents' }, 500)
  }
})

// ===== LLM MODELS =====

app.get('/make-server-73c2e870/llm-models', async (c) => {
  try {
    const models = [
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
      { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
      { id: 'llama-2', name: 'Llama 2', provider: 'Meta' },
      { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI' },
    ]
    
    return c.json({ models })
  } catch (error) {
    console.log(`Error fetching LLM models: ${error}`)
    return c.json({ error: 'Internal server error while fetching LLM models' }, 500)
  }
})

// ===== CONNECTORS =====

app.get('/make-server-73c2e870/connectors', async (c) => {
  try {
    const connectors = [
      { id: 'salesforce', name: 'Salesforce', type: 'CRM', icon: '☁️' },
      { id: 'hubspot', name: 'HubSpot', type: 'CRM', icon: '🔶' },
      { id: 'sap', name: 'SAP', type: 'ERP', icon: '💼' },
      { id: 'oracle', name: 'Oracle', type: 'ERP', icon: '🔴' },
      { id: 'indeed', name: 'Indeed', type: 'Jobboard', icon: '💼' },
      { id: 'linkedin', name: 'LinkedIn', type: 'Jobboard', icon: '💼' },
      { id: 'stripe', name: 'Stripe', type: 'Facturation', icon: '💳' },
      { id: 'quickbooks', name: 'QuickBooks', type: 'Facturation', icon: '📊' },
    ]
    
    return c.json({ connectors })
  } catch (error) {
    console.log(`Error fetching connectors: ${error}`)
    return c.json({ error: 'Internal server error while fetching connectors' }, 500)
  }
})

Deno.serve(app.fetch)
