// @ts-nocheck
import {
  ArcCurve,
  BufferAttribute,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Points,
  PointsMaterial,
  Quaternion,
  Vector3
} from 'three'
import { lon2xyz } from './common'

/*
 * Vẽ đường bay vòng cung
 * 5Ý nghĩa tham số:( Bán kính quỹ đạo vòng cung đường bay, góc bắt đầu, góc cuối)
 */
function createFlyLine(radius, startAngle, endAngle, color) {
  const geometry = new BufferGeometry() //Khai báo một đối tượng hình họcBufferGeometry
  //  ArcCurveTạo đường cong vòng cung
  const arc = new ArcCurve(0, 0, radius, startAngle, endAngle, false)
  //getSpacedPointsLà lớp cơ sởCurvephương thức, trả về mộtvector2Đối tượng là một mảng các phần tử
  const pointsArr = arc.getSpacedPoints(100) //PhútSố lượng phân đoạn80,trở lại81đỉnh
  geometry.setFromPoints(pointsArr) // setFromPointsPhương pháp từpointsArrchiết xuất từ ​​​​Dữ liệuThay đổi thuộc tính đỉnh của hình họcvertices
  // Mỗi đỉnh tương ứng với một trămPhútSo sánhDữ liệuattributes.percent Kích thước kết xuất được sử dụng để kiểm soát điểm
  const percentArr = [] //attributes.percentcủaDữ liệu
  for (let i = 0; i < pointsArr.length; i++) {
    percentArr.push(i / pointsArr.length)
  }
  const percentAttribue = new BufferAttribute(new Float32Array(percentArr), 1)
  // qua các đỉnhDữ liệupercentđiểmBiểu mẫu ModelThay đổi từ lớn sang nhỏ, tạo ra đường bay hình con nòng nọc
  geometry.attributes.percent = percentAttribue
  // Tính toán tất cả các đỉnh theo đợtMàu sắcDữ liệu
  const colorArr = []
  for (let i = 0; i < pointsArr.length; i++) {
    const color1 = new Color(0xec8f43) //đường quỹ đạoMàu sắc màu xanh da trời
    const color2 = new Color(0xf3ae76) //màu vàng
    const color = color1.lerp(color2, i / pointsArr.length)
    colorArr.push(color.r, color.g, color.b)
  }
  // Cài Đặt ChỉnhĐỉnh hình họcMàu sắcDữ liệu
  geometry.attributes.color = new BufferAttribute(new Float32Array(colorArr), 3)
  const size = 1.3
  // điểmBiểu mẫu ModelHiển thị từng đỉnh của hình học
  const material = new PointsMaterial({
    size, //kích thước điểm
    // vertexColors: VertexColors, //Sử dụng đỉnhMàu sắckết xuất
    transparent: true,
    depthWrite: false
  })
  // Sửa đổi mã nguồn đổ bóng của vật liệu điểm(Lưu ý: Chi tiết của các phiên bản khác nhau có thể hơi khác nhau nhưng ý tưởng tổng thể thì giống nhau.)
  material.onBeforeCompile = function (shader) {
    // Khai báo a trong trình đổ bóng đỉnhattributebiến:TrămPhútSo sánh
    shader.vertexShader = shader.vertexShader.replace(
      'void main() {',
      [
        'attribute float percent;', //Kích thước đỉnhPhútBiến tỷ lệ, kích thước kết xuất điểm kiểm soát
        'void main() {'
      ].join('\n') // .join()Kết hợp các phần tử mảng thành một chuỗi
    )
    // Điều chỉnh phương pháp tính kích thước kết xuất điểm
    shader.vertexShader = shader.vertexShader.replace(
      'gl_PointSize = size;',
      ['gl_PointSize = percent * size;'].join('\n') // .join()Kết hợp các phần tử mảng thành một chuỗi
    )
  }
  const FlyLine = new Points(geometry, material)
  material.color = new Color(color)
  FlyLine.name = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_304') : 'đường bay')

  return FlyLine
}

/**Vào Trái ĐấtTrênTọa độ vĩ độ và kinh độ của hai điểm bất kỳ, thông qua hàmflyArcBạn có thể vẽ một quỹ đạo vòng cung đường bay
 * lon1,lat1:Tọa độ kinh độ và vĩ độ của điểm bắt đầu của đường quỹ đạo
 * lon2,lat2: Tọa độ kinh độ, vĩ độ điểm cuối của đường quỹ đạo
 */
function flyArc(radius, lon1, lat1, lon2, lat2, options) {
  const sphereCoord1 = lon2xyz(radius, lon1, lat1) //Chuyển đổi tọa độ vĩ độ và kinh độ thành tọa độ hình cầu
  // startSphereCoord: Tọa độ cầu của điểm đầu của đường quỹ đạo
  const startSphereCoord = new Vector3(sphereCoord1.x, sphereCoord1.y, sphereCoord1.z)
  const sphereCoord2 = lon2xyz(radius, lon2, lat2)
  // startSphereCoord: Tọa độ cầu của điểm cuối của đường quỹ đạo
  const endSphereCoord = new Vector3(sphereCoord2.x, sphereCoord2.y, sphereCoord2.z)

  //Tính các thông số cần thiết để vẽ cungyCác bậc bốn bắt đầu, kết thúc và xoay đối xứng trục
  const startEndQua = _3Dto2D(startSphereCoord, endSphereCoord)
  // gọi arcXOYHàm vẽ quỹ đạo đường bay vòng cung
  const arcline = arcXOY(radius, startEndQua.startPoint, startEndQua.endPoint, options)
  arcline.quaternion.multiply(startEndQua.quaternion)
  return arcline
}
/*
 * Bó3Dbề mặt hình cầuTrênĐiểm bắt đầu và điểm kết thúc của hai đường bay bất kỳ xoay quanh tâm quả bóng đểXOYphẳngTrên，
 * như nhauGiờgiữ vềyĐối xứng trục, được vẽ bằng cách sử dụng điểm bắt đầu và điểm kết thúc mới thu được bằng cách xoay
 * Một vòng cung. Cuối cùng, xoay ngược cung đã vẽ về điểm đầu và điểm cuối ban đầu.
 */
function _3Dto2D(startSphere, endSphere) {
  /*Tính bậc bốn của phép quay thứ nhất: biểu thị cách quay từ mặt phẳng này sang mặt phẳng khác*/
  const origin = new Vector3(0, 0, 0) //Tọa độ trung tâm hình cầu
  const startDir = startSphere.clone().sub(origin) //Điểm bắt đầu của đường bay và tâm của quả bóng tạo thành một vectơ chỉ phương
  const endDir = endSphere.clone().sub(origin) //Điểm cuối của đường bay và tâm của quả bóng tạo thành một vectơ chỉ phương
  // dir1Vàdir2tạo thành một hình tam giác,.cross()Tích chéo tính pháp tuyến của tam giácnormal
  const normal = startDir.clone().cross(endDir).normalize()
  const xoyNormal = new Vector3(0, 0, 1) //XOYbình thường trên máy bay
  //.setFromUnitVectors()Tính từnormalXoay vectơ đạt tớixoyNormalquaternion cần thiết cho vector
  // quaternionNó có nghĩa là xoay đường bay hình cầu đểXOYphẳngTrênyêu cầu quaternion
  const quaternion3D_XOY = new Quaternion().setFromUnitVectors(normal, xoyNormal)
  /*Vòng quay thứ nhất: điểm đầu và điểm cuối của đường bay tính từ3DLần đầu tiên không gian quayXOYphẳng*/
  const startSphereXOY = startSphere.clone().applyQuaternion(quaternion3D_XOY)
  const endSphereXOY = endSphere.clone().applyQuaternion(quaternion3D_XOY)

  /*Tính toán quaternion cho phép quay thứ hai*/
  // middleV3：startSphereXOYVàendSphereXOYtrung điểm của
  const middleV3 = startSphereXOY.clone().add(endSphereXOY).multiplyScalar(0.5)
  const midDir = middleV3.clone().sub(origin).normalize() // vectơ trước khi quaymidDir,trung điểmmiddleV3và vectơ chỉ phương tạo bởi tâm của hình cầu
  const yDir = new Vector3(0, 1, 0) // vectơ sau khi quayyDir,Ngay lập tứcytrục
  // .setFromUnitVectors()Tính từmidDirXoay vectơ đạt tớiyDirquaternion cần thiết cho vector
  // quaternion2Cho biết rằng vòng quay đầu tiên làXOYĐiểm đầu và điểm cuối của mặt phẳng khoảngyQuaternions cần thiết cho sự đối xứng trục
  const quaternionXOY_Y = new Quaternion().setFromUnitVectors(midDir, yDir)

  /*Vòng quay thứ hai: Thực hiện xoay vòng đểXOYCác điểm của mặt phẳng được quay lại để đạt được khoảngYđối xứng trục*/
  const startSpherXOY_Y = startSphereXOY.clone().applyQuaternion(quaternionXOY_Y)
  const endSphereXOY_Y = endSphereXOY.clone().applyQuaternion(quaternionXOY_Y)

  /**Một quaternion đại diện cho một quá trình quay
   *.invert()Phương pháp này thể hiện nghịch đảo của quaternion, có nghĩa đơn giản là đảo ngược quá trình quay.
   * Thực hiện quaternion của hai phép quay.invert()Tìm nghịch đảo rồi thực hiện.multiply()nhân
   *phiên bản mới.invert()Tương ứng với các phiên bản cũ hơn.invert()
   */
  const quaternionInverse = quaternion3D_XOY.clone().invert().multiply(quaternionXOY_Y.clone().invert())
  return {
    // Trả về nghịch đảo quaternion của quaternion được xoay hai lần
    quaternion: quaternionInverse,
    // Sau hai lần quay phạm vi,XOYphẳngTrênVềyTọa độ điểm đầu và điểm cuối của cung đối xứng trục
    startPoint: startSpherXOY_Y,
    endPoint: endSphereXOY_Y
  }
}
/**thông qua chức năngarcXOY()Có thể tìm thấy ởXOYphẳngTrênvẽ một bức tranh vềyĐường cong cung đối xứng trục
 * startPoint, endPoint: Cho biết giá trị tọa độ của điểm bắt đầu và điểm kết thúc của đường cong vòng cung. Điểm bắt đầu và kết thúc là khoảngyđối xứng trục
 * như nhauGiờCơ bản về quỹ đạo cungTrênVẽ một đường bay*/
function arcXOY(radius, startPoint, endPoint, options) {
  // Tính trung điểm của hai điểm
  const middleV3 = new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5)
  // hướng của dây vuông gócdir(Vectơ tạo bởi trung điểm của dây cung và tâm của đường tròn)
  const dir = middleV3.clone().normalize()
  // Tính giá trị radian của góc giữa điểm đầu, điểm cuối của đường bay hình cầu và tâm quả cầu
  const earthRadianAngle = radianAOB(startPoint, endPoint, new Vector3(0, 0, 0))
  /*Cài Đặt ChỉnhTọa độ trung điểm của cung quỹ đạo đường bay
  giá trị radian * radius * 0.2: Biểu thị cung quỹ đạo đường bayTrên cùngKhoảng cách từ quả cầu Trái đất
  Điểm đầu và điểm cuối càng xa nhau thì cung được tạo thànhTrên cùngKhoảng cách từ quả cầu càng cao*/
  const arcTopCoord = dir.multiplyScalar(radius + earthRadianAngle * radius * 0.2) // đường bay màu vàngChiều cao
  //Tìm tâm đường tròn ngoại tiếp ba điểm(Tọa độ tâm quỹ đạo cung của đường bay)
  const flyArcCenter = threePointCenter(startPoint, endPoint, arcTopCoord)
  // Bán kính quỹ đạo vòng cung đường bayflyArcR
  const flyArcR = Math.abs(flyArcCenter.y - arcTopCoord.y)
  /*Gốc tọa độ và điểm đầu của đường bayCung thẳngVàyGiá trị radian của góc nửa trục âm của trục
  tham sốPhútRiêng: điểm đầu của đường bay cung,ynửa trục âmTrênMột điểm, tâm cung đường bay*/
  const flyRadianAngle = radianAOB(startPoint, new Vector3(0, -1, 0), flyArcCenter)
  const startAngle = -Math.PI / 2 + flyRadianAngle //Góc bắt đầu vòng cung đường bay
  const endAngle = Math.PI - startAngle //Góc cuối cung đường bay
  // Gọi đường vòng cungBiểu mẫu ModelChức năng vẽ của
  const arcline = circleLine(flyArcCenter.x, flyArcCenter.y, flyArcR, startAngle, endAngle, options.color)
  // const arcline = new  Group();// Không vẽ đường quỹ đạo, sử dụng Groupthay thếcircleLine()Thế thôi
  arcline.center = flyArcCenter //Vòng cung đường bay có một thuộc tính tùy chỉnh đại diện cho tâm của vòng cung đường bay.
  arcline.topCoord = arcTopCoord //Vòng cung đường bay có một thuộc tính tùy chỉnh chỉ ra rằng phần giữa của vòng cung đường bay làTrên cùngđiều phối

  // const flyAngle = Math.PI/ 10; //Đường bay vòng cung cố định
  const flyAngle = (endAngle - startAngle) / 7 //Cung của đường bay có quan hệ với cung của đường quỹ đạo.
  // Vẽ một đường bay, lấy tâm đường tròn làm gốc tọa độ
  const flyLine = createFlyLine(flyArcR, startAngle, startAngle + flyAngle, options.flyLineColor)
  flyLine.position.y = flyArcCenter.y //Cung của đường bay tịnh tiến trùng với cung của quỹ đạo đường bay
  //Đoạn đường bayflyLinenhư quỹ đạo đường bayarcLineĐối tượng phụ, kế thừa sự dịch chuyển quỹ đạo đường bay, xoay, v.v.Chuyển đổi
  arcline.add(flyLine)
  //Phạm vi di chuyển của đoạn đường baystartAngle~flyEndAngle
  flyLine.flyEndAngle = endAngle - startAngle - flyAngle
  flyLine.startAngle = startAngle
  // arcline.flyEndAngle: Góc hiện tại của đoạn đường bayVị trí, đâyCài Đặt ChỉnhMột giá trị ngẫu nhiên được sử dụng để trình diễn
  flyLine.AngleZ = arcline.flyEndAngle * Math.random()
  // flyLine.rotation.z = arcline.AngleZ;
  // arcline.flyLineTrỏ tới đoạn đường bay,dễ dàng đểCài Đặt ChỉnhAnimationLà quyền truy cập vào đoạn đường bay
  arcline.userData['flyLine'] = flyLine

  return arcline
}
/*Tính toán hình cầuTrênGiá trị radian của góc giữa hai điểm và tâm của hình cầu
tham sốpoint1, point2:Biểu thị bề mặt hình cầu của trái đấtTrênTọa độ hai điểmVector3
tính toánA、Bhai điểm và đỉnhOđược thành lậpAOBgiá trị radian góc bao gồm*/
function radianAOB(A, B, O) {
  // dir1、dir2：Bề mặt hình cầuTrênVectơ chỉ phương tạo bởi hai điểm và tâm của mặt cầu
  const dir1 = A.clone().sub(O).normalize()
  const dir2 = B.clone().sub(O).normalize()
  //Bấm và nhân lên.dot()Tính cosin của góc xen vào
  const cosAngle = dir1.clone().dot(dir2)
  const radianAngle = Math.acos(cosAngle) //Giá trị cosine cho giá trị góc radian,Phạm vi góc bao gồm có thể được tính thông qua giá trị cosin:0~180Tiêu
  return radianAngle
}
/*Vẽ một đường cong vòng cungBiểu mẫu ModelLine
5Ý nghĩa tham số:(trục hoành của tâm đường tròn, tọa độ dọc của tâm đường tròn, Bán kính quỹ đạo vòng cung đường bay, góc bắt đầu, góc cuối)*/
function circleLine(x, y, r, startAngle, endAngle, color) {
  const geometry = new BufferGeometry() //Khai báo một đối tượng hình họcGeometry
  //  ArcCurveTạo đường cong vòng cung
  const arc = new ArcCurve(x, y, r, startAngle, endAngle, false)
  //getSpacedPointsLà lớp cơ sởCurvephương thức, trả về mộtvector2Đối tượng là một mảng các phần tử
  const points = arc.getSpacedPoints(80) //PhútSố lượng phân đoạn50,trở lại51đỉnh
  geometry.setFromPoints(points) // setFromPointsPhương pháp từpointschiết xuất từ ​​​​Dữ liệuThay đổi thuộc tính đỉnh của hình họcvertices
  const material = new LineBasicMaterial({
    color: color || 0xd18547
  }) //Vật liệu đường
  const line = new Line(geometry, material) //đường kẻBiểu mẫu Modelsự vật
  return line
}
//Tìm tâm đường tròn ngoại tiếp ba điểmp1, p2, p3Biểu thị tọa độ của ba điểmVector3。
function threePointCenter(p1, p2, p3) {
  const L1 = p1.lengthSq() //p1Bình phương khoảng cách đến gốc tọa độ
  const L2 = p2.lengthSq()
  const L3 = p3.lengthSq()
  const x1 = p1.x,
    y1 = p1.y,
    x2 = p2.x,
    y2 = p2.y,
    x3 = p3.x,
    y3 = p3.y
  const S = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2
  const x = (L2 * y3 + L1 * y2 + L3 * y1 - L2 * y1 - L3 * y2 - L1 * y3) / S / 2
  const y = (L3 * x2 + L2 * x1 + L1 * x3 - L1 * x2 - L2 * x3 - L3 * x1) / S / 2
  // Tọa độ tâm đường tròn ngoại tiếp ba điểm
  const center = new Vector3(x, y, 0)
  return center
}

export { arcXOY, flyArc }
