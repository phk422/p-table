// pages/table/table.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colName: [
      { prop: 'username', label: '用户名' },
      { prop: 'gender', label: '性别' },
      { prop: 'birthday', label: '生日' },
      { prop: 'cla', label: '班级' },
      { prop: 'age', label: '年龄' },
      { prop: 'star', label: '星座' }
    ],
    tableData: [
      {
        username: '张三',
        gender: '男',
        birthday: '1997-01-22',
        cla: '2班',
        age: 18,
        star: "射手座"
      },
      {
        username: '李四',
        gender: '男',
        birthday: '1997-11-12',
        cla: '2班',
        age: 23,
        star: "射手座"
      },
      {
        username: '王五',
        gender: '女',
        birthday: '2000-08-22',
        cla: '2班',
        age: 18,
        star: "射手座"
      },
      {
        username: '赵六',
        gender: '女',
        birthday: '2001-03-12',
        cla: '2班',
        age: 17,
        star: "白羊座"
      },
      {
        username: '李大方',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      }, {
        username: '杨过',
        gender: '男',
        birthday: '1879-12-09',
        cla: '3班',
        age: 40,
        star: "射手座"
      }, {
        username: '李大方',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      }, {
        username: '李大方',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      }, {
        username: '李大方',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      }, {
        username: '张九天',
        gender: '男',
        birthday: '2001-03-23',
        cla: '2班',
        age: 24,
        star: "天秤座"
      }, {
        username: '彭四方',
        gender: '男',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      }, 
      {
        username: '刘四海',
        gender: '男',
        birthday: '1996-03-23',
        cla: '2班',
        age: 24,
        star: "金牛座"
      },
      {
        username: '李大方',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "金牛座"
      },
      {
        username: '刘大海',
        gender: '女',
        birthday: '1996-03-18',
        cla: '2班',
        age: 24,
        star: "水瓶座"
      },
      {
        username: '赵七八',
        gender: '女',
        birthday: '1996-02-13',
        cla: '3班',
        age: 24,
        star: "金牛座"
      },
    ]
  },

  // table组件传递来的
  currentCheckedIndexs(e) {
    console.log(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})