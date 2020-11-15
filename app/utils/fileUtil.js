module.exports = {
  json_Save: function (filePath, list) {
    let f_list = []
    if (fs.existsSync(filePath)) {
      f_list = JSON.parse(fs.readFileSync(filePath))
      if (Array.isArray(list)) {
        f_list = f_list.concat(list)
      } else {
        f_list.push(list)
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(f_list))
  },

  json_Delete: function (filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}
