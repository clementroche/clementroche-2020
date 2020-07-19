export default function(bufferGeometry, removeEdge = false) {
  const attrib =
    bufferGeometry.getIndex() || bufferGeometry.getAttribute('position')
  const count = attrib.count / 3
  const barycentric = []

  // for each triangle in the geometry, add the barycentric coordinates
  for (let i = 0; i < count; i++) {
    const even = i % 2 === 0
    const Q = removeEdge ? 1 : 0
    if (even) {
      barycentric.push(0, 0, 1, 0, 1, 0, 1, 0, Q)
    } else {
      barycentric.push(0, 1, 0, 0, 0, 1, 1, 0, Q)
    }
  }

  // add the attribute to the geometry
  const array = new Float32Array(barycentric)
  const attribute = new THREE.BufferAttribute(array, 3)

  return attribute
}
