export default function unindexBufferGeometry(bufferGeometry) {
  // un-indices the geometry, copying all attributes like position and uv
  const index = bufferGeometry.getIndex()
  if (!index) return // already un-indexed

  const indexArray = index.array
  const triangleCount = indexArray.length / 3

  const attributes = bufferGeometry.attributes
  const newAttribData = Object.keys(attributes).map((key) => {
    return {
      name: key,
      array: [],
      attribute: bufferGeometry.getAttribute(key)
    }
  })

  for (let i = 0; i < triangleCount; i++) {
    // indices into attributes
    const a = indexArray[i * 3 + 0]
    const b = indexArray[i * 3 + 1]
    const c = indexArray[i * 3 + 2]
    const indices = [a, b, c]

    // for each attribute, put vertex into unindexed list
    newAttribData.forEach((data) => {
      const attrib = data.attribute
      const dim = attrib.itemSize
      // add [a, b, c] vertices
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i]
        for (let d = 0; d < dim; d++) {
          const v = attrib.array[index * dim + d]
          data.array.push(v)
        }
      }
    })
  }
  index.array = null
  bufferGeometry.setIndex(null)

  // now copy over new data
  newAttribData.forEach((data) => {
    const newArray = new data.attribute.array.constructor(data.array)
    const bufferArray = new THREE.BufferAttribute(
      newArray,
      data.attribute.itemSize
    )
    bufferGeometry.setAttribute(data.name, bufferArray)
  })
}
