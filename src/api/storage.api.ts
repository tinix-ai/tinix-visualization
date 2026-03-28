import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const getProjectsApi = async () => {
  try {
    const res = await axios.get(`${API_BASE}/projects`)
    return res.data
  } catch (err) {
    console.error('Fetch projects failed:', err)
    return null
  }
}

export const getProjectApi = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE}/projects/${id}`)
    return res.data
  } catch (err) {
    console.error('Fetch project failed:', err)
    return null
  }
}

export const saveProjectApi = async (projectData: any) => {
  try {
    const res = await axios.post(`${API_BASE}/projects`, projectData)
    return res.data
  } catch (err) {
    console.error('Save project failed:', err)
    return null
  }
}

export const deleteProjectApi = async (id: string) => {
  try {
    const res = await axios.delete(`${API_BASE}/projects/${id}`)
    return res.data
  } catch (err) {
    console.error('Delete project failed:', err)
    return null
  }
}

export const getUserTemplatesApi = async () => {
  try {
    const res = await axios.get(`${API_BASE}/user-templates`)
    return res.data
  } catch (err) {
    console.error('Fetch user templates failed:', err)
    return null
  }
}

export const saveUserTemplateApi = async (templateData: any) => {
  try {
    const res = await axios.post(`${API_BASE}/user-templates`, templateData)
    return res.data
  } catch (err) {
    console.error('Save user template failed:', err)
    return null
  }
}

export const deleteUserTemplateApi = async (id: string) => {
  try {
    const res = await axios.delete(`${API_BASE}/user-templates/${id}`)
    return res.data
  } catch (err) {
    console.error('Delete user template failed:', err)
    return null
  }
}

export const getTemplateOverridesApi = async () => {
  try {
    const res = await axios.get(`${API_BASE}/template-overrides`)
    return res.data
  } catch (err) {
    console.error('Fetch template overrides failed:', err)
    return null
  }
}

export const saveTemplateOverridesApi = async (overrides: any[]) => {
  try {
    const res = await axios.post(`${API_BASE}/template-overrides`, overrides)
    return res.data
  } catch (err) {
    console.error('Save template overrides failed:', err)
    return null
  }
}

export const getSystemTemplatesApi = async () => {
  try {
    const res = await axios.get(`${API_BASE}/system-templates`)
    return res.data
  } catch (err) {
    console.error('Fetch system templates failed:', err)
    return null
  }
}

export const saveSystemTemplateApi = async (templateData: any) => {
  try {
    const res = await axios.post(`${API_BASE}/system-templates`, templateData)
    return res.data
  } catch (err) {
    console.error('Save system template failed:', err)
    return null
  }
}

// APIs cho Datasets
export const getDatasetsApi = async () => {
  try {
    const res = await axios.get(`${API_BASE}/datasets`)
    return res.data
  } catch (err) {
    console.error('Fetch datasets failed:', err)
    return null
  }
}

export const saveDatasetApi = async (dataset: any) => {
  try {
    const res = await axios.post(`${API_BASE}/datasets`, dataset)
    return res.data
  } catch (err) {
    console.error('Save dataset failed:', err)
    return null
  }
}

export const deleteDatasetApi = async (id: string) => {
  try {
    const res = await axios.delete(`${API_BASE}/datasets/${id}`)
    return res.data
  } catch (err) {
    console.error('Delete dataset failed:', err)
    return null
  }
}

// APIs cho Auto-BI
export const analyzeDatasetApi = async (sampleData: any) => {
  try {
    const res = await axios.post(`${API_BASE}/auto-bi/analyze`, { sampleData })
    return res.data
  } catch (err) {
    console.error('Analyze dataset failed:', err)
    return null
  }
}

export const suggestChartsApi = async (confirmedSchema: any) => {
  try {
    const res = await axios.post(`${API_BASE}/auto-bi/suggest`, { confirmedSchema })
    return res.data
  } catch (err) {
    console.error('Suggest charts failed:', err)
    return null
  }
}
