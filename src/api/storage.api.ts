import axios from './axios'

export const getProjectsApi = async () => {
  try {
    const res = await axios.get('/projects')
    return res.data
  } catch (err) {
    console.error('Fetch projects failed:', err)
    return null
  }
}

export const getProjectApi = async (id: string) => {
  try {
    const res = await axios.get(`/projects/${id}`)
    return res.data
  } catch (err) {
    console.error('Fetch project failed:', err)
    return null
  }
}

export const saveProjectApi = async (projectData: any) => {
  try {
    const res = await axios.post('/projects', projectData)
    return res.data
  } catch (err) {
    console.error('Save project failed:', err)
    return null
  }
}

export const deleteProjectApi = async (id: string) => {
  try {
    const res = await axios.delete(`/projects/${id}`)
    return res.data
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      console.warn('Project already gone from server:', id)
      return { success: true, alreadyGone: true }
    }
    console.error('Delete project failed:', err)
    return null
  }
}

export const getUserTemplatesApi = async () => {
  try {
    const res = await axios.get('/user-templates')
    return res.data
  } catch (err) {
    console.error('Fetch user templates failed:', err)
    return null
  }
}

export const saveUserTemplateApi = async (templateData: any) => {
  try {
    const res = await axios.post('/user-templates', templateData)
    return res.data
  } catch (err) {
    console.error('Save user template failed:', err)
    return null
  }
}

export const deleteUserTemplateApi = async (id: string) => {
  try {
    const res = await axios.delete(`/user-templates/${id}`)
    return res.data
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return { success: true }
    }
    console.error('Delete user template failed:', err)
    return null
  }
}

export const getTemplateOverridesApi = async () => {
  try {
    const res = await axios.get('/template-overrides')
    return res.data
  } catch (err) {
    console.error('Fetch template overrides failed:', err)
    return null
  }
}

export const saveTemplateOverridesApi = async (overrides: any[]) => {
  try {
    const res = await axios.post('/template-overrides', overrides)
    return res.data
  } catch (err) {
    console.error('Save template overrides failed:', err)
    return null
  }
}

export const getSystemTemplatesApi = async () => {
  try {
    const res = await axios.get('/system-templates')
    return res.data
  } catch (err) {
    console.error('Fetch system templates failed:', err)
    return null
  }
}

export const saveSystemTemplateApi = async (templateData: any) => {
  try {
    const res = await axios.post('/system-templates', templateData)
    return res.data
  } catch (err) {
    console.error('Save system template failed:', err)
    return null
  }
}

// APIs cho Datasets
export const getDatasetsApi = async () => {
  try {
    const res = await axios.get('/datasets')
    return res.data
  } catch (err) {
    console.error('Fetch datasets failed:', err)
    return null
  }
}

export const saveDatasetApi = async (dataset: any) => {
  try {
    const res = await axios.post('/datasets', dataset)
    return res.data
  } catch (err) {
    console.error('Save dataset failed:', err)
    return null
  }
}

export const getDatasetApi = async (id: string, includeMeta: boolean = true) => {
  try {
    const res = await axios.get(`/datasets/${id}`, {
      params: { includeMeta: includeMeta }
    })
    return res.data
  } catch (err) {
    console.error('Fetch dataset details failed:', err)
    return null
  }
}

export const deleteDatasetApi = async (id: string) => {
  try {
    const res = await axios.delete(`/datasets/${id}`)
    return res.data
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return { success: true }
    }
    console.error('Delete dataset failed:', err)
    return null
  }
}

// APIs cho Auto-BI
export const analyzeDatasetApi = async (sampleData: any) => {
  try {
    const res = await axios.post('/auto-bi/analyze', { sampleData })
    return res.data
  } catch (err) {
    console.error('Analyze dataset failed:', err)
    return null
  }
}

export const suggestChartsApi = async (confirmedSchema: any) => {
  try {
    const res = await axios.post('/auto-bi/suggest', { confirmedSchema })
    return res.data
  } catch (err) {
    console.error('Suggest charts failed:', err)
    return null
  }
}

// APIs cho System Settings
export const getGlobalSettingsApi = async (id: string = 'global') => {
  try {
    const res = await axios.get(`/system-settings/${id}`)
    return res.data
  } catch (err: any) {
    // Nếu không tìm thấy (404), trả về null một cách im lặng vì đây là trạng thái mặc định
    if (err.response && err.response.status === 404) {
      return null
    }
    console.error('Fetch global settings failed:', err)
    return null
  }
}

export const saveGlobalSettingsApi = async (config: any, id: string = 'global') => {
  try {
    const res = await axios.post('/system-settings', { id, config })
    return res.data
  } catch (err) {
    console.error('Save global settings failed:', err)
    return null
  }
}

// APIs cho Private Photos
export const getPrivatePhotosApi = async () => {
  try {
    const res = await axios.get('/private-photos')
    return res.data
  } catch (err) {
    console.error('Fetch private photos failed:', err)
    return null
  }
}

export const savePrivatePhotoApi = async (photo: { id: string, name: string, content: string }) => {
  try {
    const res = await axios.post('/private-photos', photo)
    return res.data
  } catch (err) {
    console.error('Save private photo failed:', err)
    return null
  }
}

export const deletePrivatePhotoApi = async (id: string) => {
  try {
    const res = await axios.delete(`/private-photos/${id}`)
    return res.data
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return { success: true }
    }
    console.error('Delete private photo failed:', err)
    return null
  }
}
