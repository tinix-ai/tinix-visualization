/**
 * Tệp tài nguyên
 * Tải mô hình và hình ảnh riêng biệt
 */

interface ITextures {
  name: string
  url: string
}

export interface IResources {
  textures?: ITextures[]
}

const fileSuffix = ['earth', 'gradient', 'redCircle', 'label', 'aperture', 'glow', 'light_column', 'aircraft']
const textures: ITextures[] = []

const modules: Record<string, { default: string }> = import.meta.glob("../../images/earth/*", { eager: true })

for(let item in modules) {
  const n = item.split('/').pop()
  if(n) {
    textures.push({
      name: n.split('.')[0],
      url: modules[item].default
    })
  }
}

const resources: IResources = {
  textures
}

export { resources }
