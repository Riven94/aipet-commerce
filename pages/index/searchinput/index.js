// pages/index/searchinput/index.js
const domain = getApp().globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchIcon: domain + "/media/icon/search.png",
        currentData: 0, 
        selectPerson: true,
        myPublish:[
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
            {img:"/icons/diamond.png", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"}

          ]
    },
    bindchange: function(e) {
        const that = this;
        that.setData({
          currentData: e.detail.current
        })
      },
      //点击切换，滑块index赋值
      checkCurrent: function(e) {
        const that = this;
    
        if (that.data.currentData === e.target.dataset.current) {
          return false;
        } else {
    
          that.setData({
            currentData: e.target.dataset.current
          })
        }
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