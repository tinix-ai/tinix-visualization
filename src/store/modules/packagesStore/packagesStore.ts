import { defineStore } from 'pinia'
import { ConfigType, PackagesStoreType, PackagesType } from './packagesStore.d'
import { packagesList } from '@/packages/index'
import { getPrivatePhotosApi, savePrivatePhotoApi, deletePrivatePhotoApi } from '@/api/storage.api'

// thành phần packages
export const usePackagesStore = defineStore({
  id: 'usePackagesStore',
  state: (): PackagesStoreType => ({
    packagesList: JSON.parse(JSON.stringify(packagesList)), // Unfreeze to allow dynamic photo injection
    newPhoto: undefined
  }),
  getters: {
    getPackagesList(): PackagesType {
      return this.packagesList
    }
  },
  actions: {
    // Sync với Server cho Private Photos
    async initialSync() {
      const serverPhotos = await getPrivatePhotosApi()
      if (serverPhotos && Array.isArray(serverPhotos)) {
        serverPhotos.forEach(p => {
          // Tránh trùng lặp nếu đã có (từ static load hoặc session)
          const exists = this.packagesList.Photos.some((item: any) => item.id === p.id)
          if (!exists) {
            this.packagesList.Photos.splice(1, 0, p)
          }
        })
      }
    },
    async addPhotos(newPhoto: ConfigType, index: number) {
      this.newPhoto = newPhoto
      this.packagesList.Photos.splice(index, 0, newPhoto)
      // Lưu lên server
      await savePrivatePhotoApi({
        id: newPhoto.id as string,
        name: newPhoto.title,
        content: newPhoto.image // base64
      })
    },
    async deletePhotos(photoInfo: ConfigType, index: number) {
      this.packagesList.Photos.splice(index, 1)
      // Xóa trên server
      if (photoInfo.id) {
        await deletePrivatePhotoApi(photoInfo.id as string)
      }
    }
  }
})
