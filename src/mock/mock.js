import Mock from 'mockjs'
const Random = Mock.Random
// ***********************************************
// Mock.mock(Interface, request, fn(option)
//  * option is request body
// ***********************************************

// //发起登录请求
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/login`, `post`, (option) => {
  return {
    data:{
      errorCode:200,
      status:4
    }
  }
})
// 发送验证码
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/verifycode/login/`, `post`, (res) => {
  return {
    code: '1234',
  }
})
// 当前用户页获取当前用户信息
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/detail/`, `get`, (res) => {
  return {
    data: {
      code: null,
      createTime: "2019-06-01 16:37:20",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "郝恩旭",
      phone: "15847261489",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },
  }
})
// 修改用户姓名
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user`, `put`, (res) => {
  return {
    aaa:"111",
    name:res.name,
    errorCode:200
  }
})

// 用户列表页
// 授权账户
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/authorize/`,`patch`,(res)=> {
return {
    id:res.body
  }
})
// 冻结账户
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/freeze/`,`patch`,(res)=> {
return {
    id:res.body
  }
})
// 解冻账户
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/recover/`,`patch`,(res)=> {
return {
    id:res.body
  }
})
// 禁止登录
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/disable/`,`patch`,(res)=> {
return {
    id:res.body
  }
})
// 获取用户列表
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/list`, `put`, (res) => {
  if (JSON.parse(res.body).pageNum == 1) {
    return {
      data:{
        data:[
          {
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id: 1,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "郝恩旭",
            phone: "15847261489",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id: 2,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "兰亭",
            phone: "15586431574",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id: 3,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "赵展",
            phone: "13298465547",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 1,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id: 4,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "常飞",
            phone: "15743215574",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:5,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "李磊",
            phone: "13846651874",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:6,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "张安",
            phone: "15016847441",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 3,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:7,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "胡丽",
            phone: "3846574421",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:8,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "陈旺",
            phone: "15812584756",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 3,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:9,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "龙龙",
            phone: "16648521486",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },{
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id:10,
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "贺龙",
            phone: "13654781452",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          },
        ],
        pageInfo:{
          total:11
        }
      }
    }
  }else {
    return {
      data: {
        data:[
          {
            code: null,
            createTime: "2019-05-15T02:35:42.000+0000",
            headImg: null,
            id: "54e2858555324f9a978b67a660c1bd7f",
            lastLoginTime: null,
            loginTime: "2019-06-01T08:37:20.000+0000",
            miotoId: "1923010",
            name: "张文文",
            phone: "16845812574",
            roleList: [
              {
                createTime: null,
                description: "普通用户",
                id: 2,
                name: "common",
                roleRes: null,
                status: null
              }
            ],
            sex: 1,
            status: 0,
            token: null
          }
        ],
        pageInfo:{
          total:11
        }
      }
    }
  }
  
})
// 搜索用户
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/user/query`,`put`,(res) => {
  const userList = [
    {
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "郝恩旭",
      phone: "15847261489",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "兰亭",
      phone: "15586431574",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "赵展",
      phone: "13298465547",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 1,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "常飞",
      phone: "15743215574",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "李磊",
      phone: "13846651874",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "张安",
      phone: "15016847441",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 3,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "胡丽",
      phone: "3846574421",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "陈旺",
      phone: "15812584756",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 3,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "龙龙",
      phone: "16648521486",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "贺龙",
      phone: "13654781452",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    },{
      code: 200,
      createTime: "2019-05-15T02:35:42.000+0000",
      headImg: null,
      id: "54e2858555324f9a978b67a660c1bd7f",
      lastLoginTime: null,
      loginTime: "2019-06-01T08:37:20.000+0000",
      miotoId: "1923010",
      name: "张文文",
      phone: "16845812574",
      roleList: [
        {
          createTime: null,
          description: "普通用户",
          id: 2,
          name: "common",
          roleRes: null,
          status: null
        }
      ],
      sex: 1,
      status: 0,
      token: null
    }
  ]
  let choosedele = {}
  userList.forEach(ele => {
    if(ele.name == JSON.parse(res.body).keywords) {
      choosedele = ele
    }
  })
  return {
    data:[
      choosedele
    ],
    pageInfo:{
      total:1
    }
  }
 
})

// 素材页-获取未上架数据
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials`,`put`,(res) => {
  let arr = [
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: 45,
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技","生物医疗","金融保险",
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: 66,
      frameUrl: "string",
      height: 0,
      // id
      id: 2,
      // 行业--多选
      industry: [
        "能源化工","家具地产"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "亚马逊推出新款无人机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190606/cont-1563264-13988761_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 3,
      // 行业--多选
      industry: [
        "网络科技","生物医疗"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "小技巧帮你拍出电影画面",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190605/cont-1562781-10037702-120809-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 4,
      // 行业--多选
      industry: [
        "餐椅美容","文教娱乐","旅游酒店"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "5G到底有多快！",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190604/cont-1562533-13981969_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 5,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: [
        "地点镜头"
      ],
      liveStatus: 0,
      //名字
      name: "游泳时想听歌？试试这款耳机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190604/cont-1562359-10097838-144607-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 6,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: [
        "空镜头"
      ],
      liveStatus: 0,
      //名字
      name: "SONY蓝牙耳机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20180521/cont-1348879-10037564-100831-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 7,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens:"企业合作",
      liveStatus: 0,
      //名字
      name: "致我的迷茫兄弟",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190606/cont-1563014-10453553-100536-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 8,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "发光曲线",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190604/cont-1562552-10453553-191202-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 9,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "神秘园",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190606/cont-1563276-12719568-134727-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 10,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 11,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 12,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 13,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 14,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 15,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 16,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 17,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 18,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 19,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 20,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 21,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 22,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 23,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 24,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 25,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 26,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 27,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 28,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 29,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 30,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
   
  ]
  let returnArr = []
  if(JSON.parse(res.body).keywords!="") {
    arr.forEach(ele => {
      if(ele.name == JSON.parse(res.body).keywords) {
        returnArr.push(ele)
      }
    })
  }else {
    returnArr = arr
  }
  return {
    data:{
      info:{
        list:returnArr,
        total:20
      }
    },
    errorCode:200
  }
})
// 上架
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials/up`,`put`,(res) => {
  console.log(JSON.parse(res.body))
  return {
    data:JSON.parse(res.body)
  }
})
// 下架
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials/down`,`put`,(res) => {
  return {
    data:JSON.parse(res.body)
  }
})
// 删除
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials`,`delete`,(res) => {
  console.log(JSON.parse(res.body))
  return {
    data:JSON.parse(res.body)
  }
})
// 获取行业列表
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials/list/industry`,`get`,(res) => {
  return {
    data:[
      {
        name:"网络科技"
      },
      {
        name:"生物医疗"
      },
      {
        name:"金融保险"
      },
      {
        name:"农林渔牧"
      },
      {
        name:"能源化工"
      },
      {
        name:"家具地产"
      },
      {
        name:"手机数码"
      },
      {
        name:"餐椅美容"
      },
      {
        name:"文教娱乐"
      },
      {
        name:"旅游酒店"
      },
      {
        name:"服装配饰"
      },
      {
        name:"综合服务"
      },
      {
        name:"党政机关"
      },
      {
        name:"交通运输"
      },
      {
        name:"美妆护肤"
      },
      {
        name:"母婴玩具"
      },
      {
        name:"其他"
      },
    ]
  }
})
// 获取镜头列表
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/materials/list/lens`,`get`,(res) => {
  return {
    data:[
      {
        name:"企业合作"
      },
      {
        name:"战略发展"
      },
      {
        name:"企业数据"
      },
      {
        name:"企业认证"
      },
      {
        name:"领导镜头"
      },
      {
        name:"老外工作"
      },
      {
        name:"概念强调"
      },
      {
        name:"企业名称"
      },
      {
        name:"地点镜头"
      },
      {
        name:"公司历史"
      },
      {
        name:"团队合照"
      },
      {
        name:"工作状态"
      },
      {
        name:"庆祝喝彩"
      },
      {
        name:"握手合作"
      },
      {
        name:"空镜头"
      },
    ]
  }
})

// 专题页
// 获取数据
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/topic/search`,`post`,(res)=> {
  let newarr = [
    // 上架+推荐
    {
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 1,
      liveStatus: 1,
      moveToSort: 0,
      name: "新春专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: null,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/40111/2596.gif_wh300.gif",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 2,
      liveStatus: 1,
      moveToSort: 0,
      name: "圣诞节专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/40124/6072.gif_wh300.gif",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 3,
      liveStatus: 1,
      moveToSort: 0,
      name: "情人节",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50131/5417.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 4,
      liveStatus: 1,
      moveToSort: 0,
      name: "愚人节",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/40012/1137.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 5,
      liveStatus: 1,
      moveToSort: 0,
      name: "冬日风情",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50074/6687.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 6,
      liveStatus: 1,
      moveToSort: 0,
      name: "高考专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 1,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50130/3096.jpg_wh300.jpg",
      usageCount: 0
    },
    // 上架
    {
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 7,
      liveStatus: 1,
      moveToSort: 0,
      name: "水果专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50037/1290.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 8,
      liveStatus: 1,
      moveToSort: 0,
      name: "花海专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50062/2148.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 9,
      liveStatus: 1,
      moveToSort: 0,
      name: "楼宇建筑专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50058/4497.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 10,
      liveStatus: 1,
      moveToSort: 0,
      name: "香港街景专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50026/0831.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 11,
      liveStatus: 1,
      moveToSort: 0,
      name: "创意学习专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50012/2481.jpg_wh300.jpg",
      usageCount: 0
    },
    // 未上架
    {
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 12,
      liveStatus: 2,
      moveToSort: 0,
      name: "毕业季专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50040/6603.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 13,
      liveStatus: 2,
      moveToSort: 0,
      name: "地理风景专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50008/9194.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 14,
      liveStatus: 2,
      moveToSort: 0,
      name: "企业文化专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50071/5713.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 15,
      liveStatus: 2,
      moveToSort: 0,
      name: "室内装潢专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50038/3442.jpg_wh300.jpg",
      usageCount: 0
    },{
      contentCount: 0,
      createTime: "2019-06-09T10:07:06.928Z",
      customs: null,
      id: 16,
      liveStatus: 2,
      moveToSort: 0,
      name: "饮食文化专题",
      order: null,
      pageNum: 0,
      pageSize: 0,
      rcode: 0,
      recommend: 0,
      recommendTime: "2019-06-09T10:07:06.928Z",
      sort: 0,
      status: 0,
      type: 0,
      updateTime: "2019-06-09T10:07:06.928Z",
      url: "http://img95.699pic.com/photo/50042/9901.jpg_wh300.jpg",
      usageCount: 0
    },  
  ]
  let putarr = []
  if (JSON.parse(res.body).name) {
    putarr = []
    newarr.forEach(ele => {
      if(ele.name==JSON.parse(res.body).name && ele.liveStatus ==JSON.parse(res.body).liveStatus ) {
        putarr.push(ele)
      }
    })
  } else if(JSON.parse(res.body).liveStatus==1&&JSON.parse(res.body).recommend==1) {
    // 请求已上架推荐数据
    putarr = []
    newarr.forEach(ele => {
      if(ele.liveStatus==1&&ele.recommend==1) {
        putarr.push(ele)
      }
    })
  } else if (JSON.parse(res.body).liveStatus==1) {
    // 请求已上架数据
    putarr = []
    newarr.forEach(ele => {
      if(ele.liveStatus==1) {
        putarr.push(ele)
      }
    })
  } else if(JSON.parse(res.body).liveStatus==2) {
    // 请求未上架数据
    putarr = []
    newarr.forEach(ele => {
      if(ele.liveStatus==2) {
        putarr.push(ele)
      }
    })
  }
  return {
    data: {
      endRow: 0,
      firstPage: 0,
      hasNextPage: true,
      hasPreviousPage: true,
      isFirstPage: true,
      isLastPage: true,
      lastPage: 0,
      list: putarr,
      navigatePages: 0,
      navigatepageNums: [
        0
      ],
      nextPage: 0,
      orderBy: "string",
      pageNum: 0,
      pageSize: 0,
      pages: 0,
      prePage: 0,
      size: 0,
      startRow: 0,
      total: 0
    },
    errorCode: 200,
    errorMsg: "数据请求成功"
  }
})
// 查看详情
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/topic/videos`,`put`,(res)=> {
  let videolist = [
    {
      id:0,
      itemid:1,
      price:20,
      url:`http://img95.699pic.com/photo/50113/0050.jpg_wh300.jpg`
    },{
      id:1,
      itemid:1,
      price:20,
      url:`http://img95.699pic.com/photo/50044/3455.jpg_wh300.jpg`
    },{
      id:2,
      itemid:1,
      price:20,
      url:`http://img95.699pic.com/photo/50114/6369.jpg_wh300.jpg`
    },{
      id:3,
      itemid:2,
      price:20,
      url:`http://img95.699pic.com/photo/50046/5273.jpg_wh300.jpg`
    },{
      id:4,
      itemid:3,
      price:20,
      url:`http://img95.699pic.com/photo/50080/5526.jpg_wh300.jpg`
    },{
      id:5,
      itemid:4,
      price:20,
      url:`http://img95.699pic.com/photo/50075/4888.jpg_wh300.jpg`
    },{
      id:6,
      itemid:5,
      price:20,
      url:`http://img95.699pic.com/photo/50059/0849.jpg_wh300.jpg`
    },{
      id:7,
      itemid:6,
      price:20,
      url:`http://img95.699pic.com/photo/50019/0045.jpg_wh300.jpg`
    },{
      id:8,
      itemid:8,
      price:20,
      url:`http://img95.699pic.com/photo/50055/7889.jpg_wh300.jpg`
    },{
      id:9,
      itemid:9,
      price:20,
      url:`http://img95.699pic.com/photo/50076/8930.jpg_wh300.jpg`
    },{
      id:10,
      itemid:10,
      price:20,
      url:`http://img95.699pic.com/photo/50046/5305.jpg_wh300.jpg`
    },{
      id:11,
      itemid:11,
      price:20,
      url:`http://img95.699pic.com/photo/50050/0685.jpg_wh300.jpg`
    },
  ]
  let returnArr = []
  videolist.forEach(element => {
    if(element.itemid == res.body) {
      returnArr.push(element)
    }
  });
  return {
    data:{
      list:returnArr
    }
  }
})
// 获取新素材数据
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/themes/list/up`,`put`,(res)=> {
  return {
    data:{
      info:{
        list:[
          {
            id:0,
            itemid:1,
            price:20,
            url:`http://img95.699pic.com/photo/50113/0050.jpg_wh300.jpg`
          },{
            id:1,
            itemid:1,
            price:20,
            url:`http://img95.699pic.com/photo/50044/3455.jpg_wh300.jpg`
          },{
            id:2,
            itemid:1,
            price:20,
            url:`http://img95.699pic.com/photo/50114/6369.jpg_wh300.jpg`
          },{
            id:3,
            itemid:2,
            price:20,
            url:`http://img95.699pic.com/photo/50046/5273.jpg_wh300.jpg`
          },{
            id:4,
            itemid:3,
            price:20,
            url:`http://img95.699pic.com/photo/50080/5526.jpg_wh300.jpg`
          },{
            id:5,
            itemid:4,
            price:20,
            url:`http://img95.699pic.com/photo/50075/4888.jpg_wh300.jpg`
          },{
            id:6,
            itemid:5,
            price:20,
            url:`http://img95.699pic.com/photo/50059/0849.jpg_wh300.jpg`
          },{
            id:7,
            itemid:6,
            price:20,
            url:`http://img95.699pic.com/photo/50019/0045.jpg_wh300.jpg`
          },{
            id:8,
            itemid:8,
            price:20,
            url:`http://img95.699pic.com/photo/50055/7889.jpg_wh300.jpg`
          },{
            id:9,
            itemid:9,
            price:20,
            url:`http://img95.699pic.com/photo/50076/8930.jpg_wh300.jpg`
          },{
            id:10,
            itemid:10,
            price:20,
            url:`http://img95.699pic.com/photo/50046/5305.jpg_wh300.jpg`
          },{
            id:11,
            itemid:11,
            price:20,
            url:`http://img95.699pic.com/photo/50050/0685.jpg_wh300.jpg`
          },
        ],
        total:12
      }
    },
    errorCode:200,
    errorMsg:'ok'
  }
})
// 移除专题内某个板块
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/topic/target/`,`delete`,(res)=> {
  return {
    id:res.body
  }
})
// 推荐
// 
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/topic`,`put`,(res)=> {
  return {
    id:JSON.parse(res.body).ids,
    errorCode:200
  }
})
// 更新
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/topic/target`,`post`,(res)=> {
  return {

  }
})

// AE模板页
Mock.mock(`http://test.miototech.com/pixel-design/oms/v1/lens`,`put`,(res)=> {
  let uparr = [
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: 45,
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技","生物医疗","金融保险",
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: 66,
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "能源化工","家具地产"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "亚马逊推出新款无人机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190606/cont-1563264-13988761_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技","生物医疗"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "小技巧帮你拍出电影画面",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190605/cont-1562781-10037702-120809-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "餐椅美容","文教娱乐","旅游酒店"
      ],
      // 镜头
      lens: "企业合作",
      liveStatus: 0,
      //名字
      name: "5G到底有多快！",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190604/cont-1562533-13981969_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: [
        "地点镜头"
      ],
      liveStatus: 0,
      //名字
      name: "游泳时想听歌？试试这款耳机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190604/cont-1562359-10097838-144607-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: [
        "空镜头"
      ],
      liveStatus: 0,
      //名字
      name: "SONY蓝牙耳机",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20180521/cont-1348879-10037564-100831-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens:"企业合作",
      liveStatus: 0,
      //名字
      name: "致我的迷茫兄弟",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190606/cont-1563014-10453553-100536-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "发光曲线",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190604/cont-1562552-10453553-191202-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "神秘园",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/third/20190606/cont-1563276-12719568-134727-hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 0,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    }
  ]
  let downarr = [
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
    {
      chosen: 0,
      chosenTime: "2019-06-08T14:05:03.447Z",
      createTime: "2019-06-08T14:05:03.447Z",
      // 自定义标签
      customs: ["视频","精彩","养生","乎乎"],
      downTime: "2019-06-08T14:05:03.447Z",
      duration: "string",
      frameUrl: "string",
      height: 0,
      // id
      id: 1,
      // 行业--多选
      industry: [
        "网络科技"
      ],
      // 镜头
      lens: "空镜头",
      liveStatus: 1,
      //名字
      name: "哥斯拉误入河中",
      outlineUrl: null,
      price: 0,
      ratio: 0,
      // 景别
      shot: 0,
      status: 0,
      tags: [
        "视频","精彩","养生","乎乎"
      ],
      targetId: 0,
      // 类型
      type: 1,
      upTime: "2019-06-08T14:05:03.447Z",
      updateTime: "2019-06-08T14:05:03.447Z",
      // 视频连接
      url: "https://video.pearvideo.com/mp4/adshort/20190608/cont-1564047-13996566_adpkg-ad_hd.mp4",
      // 会员类型
      vip: 0,
      width: 0
    },
  ]
  if(JSON.parse(res.body).live == 'up') {
    return {
      data:{
        info:{
          list:uparr,
          total:10
        }
      },
      errorCode:200
    }
  }else {
    return {
      data:{
        info:{
          list:downarr,
          total:10
        }
      },
      errorCde:200
    }
  }
})