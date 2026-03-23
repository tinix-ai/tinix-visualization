import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Texture,
  TubeGeometry,
  Vector3
} from 'three'
import { punctuation } from '../world/Earth'

/**
 * Chuyển đổi tọa độ vĩ độ và kinh độ thành tọa độ hình cầu
 * @param {Bán kính trái đất} R
 * @param {kinh độ(Giá trị góc)} longitude
 * @param {Kích thước(Giá trị góc)} latitude
 */
export const lon2xyz = (R: number, longitude: number, latitude: number): Vector3 => {
  let lon = (longitude * Math.PI) / 180 // Giá trị radian
  const lat = (latitude * Math.PI) / 180 // Giá trị radian
  lon = -lon // jshệ tọa độzCoordinate AxesKinh độ tương ứng-90bằng cấp chứ không phải là90Tiêu

  // Công thức tính chuyển tọa độ vĩ độ, kinh độ sang tọa độ cầu
  const x = R * Math.cos(lat) * Math.cos(lon)
  const y = R * Math.sin(lat)
  const z = R * Math.cos(lat) * Math.sin(lon)
  // Trả về tọa độ cầu
  return new Vector3(x, y, z)
}

// Tạo khẩu độ dao động
export const createWaveMesh = (options: { radius: number; lon: number; lat: number; textures: any }) => {
  const geometry = new PlaneGeometry(1, 1) //Mặc định trongXOYphẳngTrên
  const texture = options.textures.aperture

  const material = new MeshBasicMaterial({
    color: 0xe99f68,
    map: texture,
    transparent: true, //sử dụngBackgroundtrong suốtpngnhãn dán, chú ýBậtĐiện toán minh bạch
    opacity: 1.0,
    depthWrite: false //Vô hiệu hóa ghi vào bộ đệm sâuDữ liệu
  })
  const mesh = new Mesh(geometry, material)
  // Chuyển đổi vĩ độ và kinh độ sang tọa độ hình cầu
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat)
  const size = options.radius * 0.12 //mặt phẳng hình chữ nhậtMeshkích cỡ
  mesh.scale.set(size, size, size) //Cài Đặt Chỉnhmeshkích cỡ
  mesh.userData['size'] = size //Lên trên một thuộc tính, biểu thịmeshStatic (Cứng)kích cỡ
  mesh.userData['scale'] = Math.random() * 1.0 //Thuộc tính tùy chỉnh._sthể hiệnmeshdựa trên kích thước ban đầuTrênphóng đại  Khẩu độ ở mức gốcmesh.sizeCăn cứTrên1~2thay đổi giữa các thời điểm
  mesh.position.set(coord.x, coord.y, coord.z)
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return mesh
}

// Tạo cột
export const createLightPillar = (options: {
  radius: number
  lon: number
  lat: number
  index: number
  textures: Record<string, Texture>
  punctuation: punctuation
}) => {
  const height = options.radius * 0.3
  const geometry = new PlaneGeometry(options.radius * 0.05, height)
  geometry.rotateX(Math.PI / 2)
  geometry.translate(0, 0, height / 2)
  const material = new MeshBasicMaterial({
    map: options.textures.light_column,
    color: options.index == 0 ? options.punctuation.lightColumn.startColor : options.punctuation.lightColumn.endColor,
    transparent: true,
    side: DoubleSide,
    depthWrite: false //Nó có ảnh hưởng gì đến bộ đệm độ sâu không?
  })
  const mesh = new Mesh(geometry, material)
  const group = new Group()
  // Hai chùm ánh sáng giao nhau và chồng lên nhau
  group.add(mesh, mesh.clone().rotateZ(Math.PI / 2)) //hình học xung quanhxTrục quay nênmeshTrục quay trở thànhz
  // Chuyển đổi vĩ độ và kinh độ sang tọa độ hình cầu
  const SphereCoord = lon2xyz(options.radius, options.lon, options.lat) //SphereCoordtọa độ cầu
  group.position.set(SphereCoord.x, SphereCoord.y, SphereCoord.z) //Cài Đặt ChỉnhmeshVị trí
  const coordVec3 = new Vector3(SphereCoord.x, SphereCoord.y, SphereCoord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  group.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return group
}

// Mặt phẳng hình chữ nhật chân cột đèn
export const createPointMesh = (options: { radius: number; lon: number; lat: number; material: MeshBasicMaterial }) => {
  const geometry = new PlaneGeometry(1, 1) //Mặc định trongXOYphẳngTrên
  const mesh = new Mesh(geometry, options.material)
  // Chuyển đổi vĩ độ và kinh độ sang tọa độ hình cầu
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat)
  const size = options.radius * 0.05 // mặt phẳng hình chữ nhậtMeshkích cỡ
  mesh.scale.set(size, size, size) // Cài Đặt Chỉnhmeshkích cỡ

  // Cài Đặt ChỉnhmeshVị trí
  mesh.position.set(coord.x, coord.y, coord.z)
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return mesh
}

// Nhận điểm
export const getCirclePoints = (option: any) => {
  const list = []
  for (let j = 0; j < 2 * Math.PI - 0.1; j += (2 * Math.PI) / (option.number || 100)) {
    list.push([
      parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
      0,
      parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2))
    ])
  }
  if (option.closed) list.push(list[0])
  return list
}

// Tạo dòng

/**
 * tạo nênDynamic (Động)đường kẻ
 */
export const createAnimateLine = (option: any) => {
  // Một đường cong bao gồm nhiều mảng điểm thường được sử dụng trên đường
  const l: Array<any> = []
  option.pointList.forEach((e: Array<any>) => l.push(new Vector3(e[0], e[1], e[2])))
  const curve = new CatmullRomCurve3(l) // Đường cong

  // Thân ống
  const tubeGeometry = new TubeGeometry(curve, option.number || 50, option.radius || 1, option.radialSegments)
  return new Mesh(tubeGeometry, option.material)
}
