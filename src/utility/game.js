const blocks = [
  {type:2,bg:'bg6',bonusWin:10,bonusNum:6,linkId:6},{type:0,bg:'bg4',bonusWin:20,bonusNum:4,linkId:4},{type:0,bg:'bg0 bgs',bonusWin:50,bonusNum:0,linkId:8},{type:0,bg:'bg0',bonusWin:120,bonusNum:0,linkId:0},
  {type:0,bg:'bg7',bonusWin:5,bonusNum:7,linkId:7},{type:0,bg:'bg7 bgs',bonusWin:2,bonusNum:7,linkId:15},{type:0,bg:'bg5',bonusWin:15,bonusNum:5,linkId:5},
  {type:1,bg:'bg4 bgs',bonusWin:2,bonusNum:4,linkId:12},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:0,bg:'bg3',bonusWin:20,bonusNum:3,linkId:3},
  {type:1,bg:'bg7',bonusWin:5,bonusNum:7,linkId:7},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:0,bg:'bg3 bgs',bonusWin:2,bonusNum:3,linkId:11},
  {type:1,bg:'bg8',bonusWin:88,linkId:88},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:0,bg:'bg8',bonusWin:88,linkId:88},
  {type:1,bg:'bg2 bgs',bonusWin:2,bonusNum:2,linkId:10},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:0,bg:'bg7',bonusWin:5,bonusNum:7,linkId:7},
  {type:1,bg:'bg2',bonusWin:30,bonusNum:2,linkId:2},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:4,bg:''},{type:0,bg:'bg6 bgs',bonusWin:2,bonusNum:6,linkId:14},
  {type:1,bg:'bg5',bonusWin:15,bonusNum:5,linkId:5},{type:0,bg:'bg5 bgs',bonusWin:2,bonusNum:5,linkId:13},{type:0,bg:'bg7',bonusWin:5,bonusNum:7,linkId:7},{type:0,bg:'bg1',bonusWin:40,bonusNum:1,linkId:1},
  {type:0,bg:'bg1 bgs',bonusWin:2,bonusNum:1,linkId:9},{type:0,bg:'bg4',bonusWin:20,bonusNum:4,linkId:4},{type:0,bg:'bg6',bonusWin:10,bonusNum:6,linkId:6}
]
const imgs = [
  {img:require("@/assets/images/bar.png"),multiple:120,bg:"bg0"},
  {img:require("@/assets/images/seven.png"),multiple:40,bg:"bg1"},
  {img:require("@/assets/images/star.png"),multiple:30,bg:"bg2"},
  {img:require("@/assets/images/melon.png"),multiple:20,bg:"bg3"},
  {img:require("@/assets/images/bell.png"),multiple:20,bg:"bg4"},
  {img:require("@/assets/images/kiwi.png"),multiple:15,bg:"bg5"},
  {img:require("@/assets/images/orange.png"),multiple:10,bg:"bg6"},
  {img:require("@/assets/images/apple.png"),multiple:5,bg:"bg7"}
]
const betList = [
  {name:'bar',score:0,odds:120,expectation:0,linkNum:0,id:0},
  {name:'seven',score:0,odds:40,expectation:0,linkNum:1,id:1},
  {name:'star',score:0,odds:30,expectation:0,linkNum:2,id:2},
  {name:'melon',score:0,odds:20,expectation:0,linkNum:3,id:3},
  {name:'bell',score:0,odds:20,expectation:0,linkNum:4,id:4},
  {name:'kiwi',score:0,odds:15,expectation:0,linkNum:5,id:5},
  {name:'orange',score:0,odds:10,expectation:0,linkNum:6,id:6},
  {name:'apple',score:0,odds:5,expectation:0,linkNum:7,id:7},
  {name:'bar_small',score:0,odds:50,expectation:0,linkNum:0,id:8},
  {name:'seven_small',score:0,odds:2,expectation:0,linkNum:1,id:9},
  {name:'star_small',score:0,odds:2,expectation:0,linkNum:2,id:10},
  {name:'melon_small',score:0,odds:2,expectation:0,linkNum:3,id:11},
  {name:'bell_small',score:0,odds:2,expectation:0,linkNum:4,id:12},
  {name:'kiwi_small',score:0,odds:2,expectation:0,linkNum:5,id:13},
  {name:'orange_small',score:0,odds:2,expectation:0,linkNum:6,id:14},
  {name:'apple_small',score:0,odds:2,expectation:0,linkNum:7,id:15},
]

export  { blocks, imgs, betList }