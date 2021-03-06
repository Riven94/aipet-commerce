// pages/knowledge/addarticle/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
  data: {
      addPhotoIcon: domain + "/media/icon/addphoto.png",
      shows: false,
      artType: ['养宠知识', '户外运动', '新手攻略'],
      typeIndex:0,
      Content:"",
      articletitle:"",
      imageList:[],
      userId: '',
      articleId: '',
  },
  bindTypeChange(e){
    console.log(e.detail.value);
    const index = e.detail.value;
    this.setData({typeIndex: index});

  },

  delete(){
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      content: "确认删除此文章？",
      success(res){
        if(res.confirm){
          that.onRealDeleteArticle();
        }
      }
    })
  },

  onRealDeleteArticle(){
    const that = this;
    wx.request({
      url: domain + '/knowledge/delete',
      header: { 'content-type': 'application/json'},
      data:{
        id: that.data.articleId,
        creatorId: app.globalData.userId
      },
      method: 'POST',
      success(res){
        console.log(res);
        wx.showModal({
          cancelColor: 'cancelColor',
          content: '删除成功！',
          showCancel: false,
          success(res){
            wx.navigateBack({
            })
          }
        })
      }
    })
  },

  title:function(e){
    this.setData({
        articletitle:e.detail.value
      })   
  },

  content:function(e){
    this.setData({
        Content:e.detail.value
      })   
  },

  uploadImage:function(){
    var that=this;
    var imageList = that.data.imageList;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths 
        that.upload(tempFilePaths)
      }
    })
  },

  preview(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
    })
  },

  upload(data) { // 上传图片
    const userId = app.globalData.userId;
    var that = this;
    var imgUrls = this.data.imageList;
    wx.showToast({
        icon: "loading",
        title: "正在上传",
        duration: 10000
    }),
    data.forEach((item)=>{
      wx.uploadFile({
        filePath: item,
        //上传图片协议接口
        url: domain+'/images/uploadFile/article',
        name:'img',
        formData: {
          creatorId: userId
        },
        success(res) {
          let imgUrl = JSON.parse(res.data).imgUrl;
          imgUrl.forEach((item)=>{
            imgUrls.push(item);
          })
          //console.log(imgUrls);
          that.setData({imageList: imgUrls});
          wx.hideToast();
        },
        fail(e) {
          wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
          })
        },
      })
    })
  },

  deleteImages: function(e){
    const index = e.currentTarget.dataset.index;
    const that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '确认删除该图片？',
      success(res){
        if(res.confirm){
          that.onRealDelete(index);
        }
      }
    })
  },

  onRealDelete(index){
    var newImageList = this.data.imageList;
    newImageList.splice(index, 1);
    this.setData({ imageList: newImageList});
  },

  bindSumbit:function(params){
    var that = this;
    const temp = {
      creatorId: that.data.userId * 1,
      articleTitle: that.data.articletitle,
      article: that.data.Content,
      imgUrl: that.data.imageList,
      type: that.data.artType[that.data.typeIndex],
    };
    var valid = true;
    if(temp.articleTitle == '' || temp.article == '' || temp.imgUrl.length == 0){
      valid = false;
    }
    var path = "";
    if(this.data.articleId == ''){
      path = "/knowledge/upload";
    }
    else{
      path = "/knowledge/update";
      temp.id = this.data.articleId * 1;
    }
    if(!valid){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '数据不能为空！',
        showCancel: false
      })
    }
    else{
      app.checkContent(4,temp.article, temp.articleTitle)
      .then( res => that.submitData(temp, path))
      .catch( error => wx.showModal({
        cancelColor: 'cancelColor',
        content: '请检查内容是否正确！'
      }));
    }
  },

  async submitData(data, path){
    wx.request({
      url: domain + path, 
      method: "POST",
      data: data,
      header:{'content-type':'application/json'},
      success (res) {
        console.log(res.data);
        wx.showModal({
          title: '上传成功！',
          showCancel: false,
          success(){
            wx.navigateBack({
            })
          }
        })
      },
      fail(error){
        console.log(error);
        wx.showModal({
          title: '上传失败！',
          content:'请检查内容是否填写完整',
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    });
    console.log(options);
    if(options.articleId != undefined){
      this.setData({ articleId: options.articleId * 1});
      this.getArticle( this.data.articleId);
    }
  },

  getArticle: function(id){
    const that = this;
    wx.request({
      url: domain + '/knowledge/getDetail',
      method: "GET",
      data: {
        id: id
      },
      success: (res) => {
        const resData = res.data.data;
        console.log(resData);
        that.setData({
          Content: resData.article,
          articletitle: resData.articleTitle,
          imageList: Array.isArray(resData.imgUrl) ? resData.imgUrl : [resData.imgUrl]
        });
        that.data.artType.forEach((item,index)=>{
          if(item == resData.type){
            that.setData({typeIndex: index});
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
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