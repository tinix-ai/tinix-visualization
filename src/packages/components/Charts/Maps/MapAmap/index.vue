<template>
  <div ref="vChartRef"></div>
</template>

<script setup lang="ts">
import { ref, PropType, toRefs, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { MarkerEnum, ThemeEnum } from './config'
import { isArray } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
let {
  amapKey,
  amapStyleKey,
  amapLon,
  amapLat,
  amapZindex,
  mapMarkerType,
  lang,
  amapStyleKeyCustom,
  features,
  viewMode,
  showLabel,
  pitch,
  skyColor,
  marker,
  satelliteTileLayer,
  roadNetTileLayer,
  trafficTileLayer
} = toRefs(props.chartConfig.option.mapOptions)

let mapIns: any = null
let markers: any = []
let AMapIns: any = null
const vChartRef = ref<HTMLElement>()

const initMap = (newData: any) => {
  // khởi tạo
  AMapLoader.load({
    key: amapKey.value, //apiService key - cần dùng Secret Key ở public!!!
    version: '1.4.15', // Set version JSAPI cần nạp, mặc định{{ $t('phase7.auto_10') }}Mặc định là 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'] // Danh sách Plugin yêu cầu
  })
    .then(AMap => {
      AMapIns = AMap
      mapIns = new AMap.Map(vChartRef.value, {
        resizeEnable: true,
        zoom: amapZindex.value, // Map{{ $t('phase7.auto_227') }}cấp độ Thu phóng
        center: [amapLon.value, amapLat.value],
        lang: lang.value,
        features: features.value,
        pitch: pitch.value, // MapGóc ném, phạm vi hiệu quả 0 Tiêu- 83 Tiêu
        skyColor: skyColor.value,
        viewMode: viewMode.value, // Mapngười mẫu
        showLabel: showLabel.value, // {{ $t('phase7.auto_454') }}Mapdấu văn bản
        willReadFrequently: true
      })
      dataHandle(props.chartConfig.option.dataset)

      let satelliteLayer = new AMap.TileLayer.Satellite({
        zIndex: satelliteTileLayer.value.zIndex,
        opacity: satelliteTileLayer.value.opacity,
        zooms: satelliteTileLayer.value.zooms
      })
      let roadNetLayer = new AMap.TileLayer.RoadNet({
        zIndex: roadNetTileLayer.value.zIndex,
        opacity: roadNetTileLayer.value.opacity,
        zooms: roadNetTileLayer.value.zooms
      })
      let trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: trafficTileLayer.value.zIndex,
        opacity: trafficTileLayer.value.opacity,
        zooms: trafficTileLayer.value.zooms
      })
      mapIns.remove([satelliteLayer, roadNetLayer, trafficLayer])
      if (satelliteTileLayer.value.show) {
        mapIns.add([satelliteLayer])
      }
      if (roadNetTileLayer.value.show) {
        mapIns.add([roadNetLayer])
      }
      if (trafficTileLayer.value.show) {
        mapIns.add([trafficLayer])
      }

      mapIns.setMapStyle(
        `amap://styles/${amapStyleKeyCustom.value !== '' ? amapStyleKeyCustom.value : amapStyleKey.value}`
      )
    })
    .catch(e => {})
}

const dataHandle = (newData: any) => {
  if (!mapIns && !AMapIns) {
    initMap(props.chartConfig.option)
    return
  }
  if (isArray(newData.markers)) {
    // Đầu tiênXóadấu cũ
    mapIns.remove(markers)
    markers = []
    // ghi dấu ấn mới
    if (mapMarkerType.value === MarkerEnum.MARKER) {
      newData.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.Marker({
          position: [markerItem.position[0], markerItem.position[1]],
          offset: new AMapIns.Pixel(-13, -30)
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    } else if (mapMarkerType.value === MarkerEnum.CIRCLE_MARKER) {
      newData.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.CircleMarker({
          center: [markerItem.position[0], markerItem.position[1]],
          radius: markerItem.value,
          ...marker.value
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    }
  }
}

const stopWatch = watch(
  () => props.chartConfig.option.mapOptions,
  option => {
    initMap(option)
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// Xem trước
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  stopWatch()
  dataHandle(newData)
})
</script>
