export default class Data {
  constructor() {
    this.keys = [];
    this.values = {};
    this.tmpData = {};
  }
  set(fieldName, fieldValue, temporary) {
    this.keys.push(fieldName);
    temporary
      ? this.tmpData[':' + fieldName] = fieldValue
      : this.values[':' + fieldName] = fieldValue;
  }
  get(fieldName) {
    return this.tmpData.hasOwnProperty(':' + fieldName)
      ? this.tmpData[':' + fieldName]
      : this.values[':' + fieldName]
  }
  map(cb) {
    for (let i = 0; i < this.keys.length; i++) {
      let fieldName = this.keys[i],
        fieldValue = this.get(fieldName);
      fieldValue && cb(fieldName, fieldValue)
    }
  }
}
