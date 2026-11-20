export type AvatarId = 'stardust' | 'lunar' | 'nebula' | 'crystal' | 'aurora' | 'solar';
export type Body = { id:string; name:string; kind:string; position:[number,number,number]; radius:number; color:string; landable:boolean; real:boolean; description:string; sourceUrl?:string };
export const AVATAR_PALETTE:Record<AvatarId,{suit:string;trim:string;glow:string}> = {
 stardust:{suit:'#7774bb',trim:'#e6dfff',glow:'#b9a8ff'}, lunar:{suit:'#a6aec6',trim:'#f4f1e8',glow:'#dce8ff'},
 nebula:{suit:'#a765bd',trim:'#ffd9f4',glow:'#f5a8e7'}, crystal:{suit:'#58aebd',trim:'#d8ffff',glow:'#9cf4f2'},
 aurora:{suit:'#5eaa91',trim:'#e5ffd9',glow:'#a8f2cb'}, solar:{suit:'#d78b48',trim:'#fff1c8',glow:'#ffd38c'}
};
export const REAL_DESTINATIONS:Body[] = [
{id:'sun',name:'Mặt Trời',kind:'Ngôi sao',position:[-30,0,0],radius:4.2,color:'#ffc56d',landable:false,real:true,description:'Ngôi sao trung tâm Hệ Mặt Trời; chỉ quan sát từ xa.',sourceUrl:'https://science.nasa.gov/sun/'},
{id:'mercury',name:'Sao Thủy',kind:'Hành tinh đất đá',position:[-19,0,0],radius:.62,color:'#9b8b7e',landable:true,real:true,description:'Thế giới đầy hố va chạm gần Mặt Trời.',sourceUrl:'https://science.nasa.gov/mercury/'},
{id:'venus',name:'Sao Kim',kind:'Hành tinh đất đá',position:[-11,0,0],radius:1.12,color:'#d8a66e',landable:true,real:true,description:'Khí quyển carbon dioxide dày và bề mặt cực nóng.',sourceUrl:'https://science.nasa.gov/venus/'},
{id:'earth',name:'Trái Đất',kind:'Hành tinh đất đá · Nhà',position:[0,0,0],radius:2.2,color:'#287ca8',landable:true,real:true,description:'Ngôi nhà xanh của chúng ta; điểm khởi hành và trở về.',sourceUrl:'https://science.nasa.gov/earth/'},
{id:'moon',name:'Mặt Trăng',kind:'Vệ tinh tự nhiên',position:[6,1.1,-1],radius:.62,color:'#b9bfd0',landable:true,real:true,description:'Thế giới đá gần Trái Đất, con người từng đặt chân tới.',sourceUrl:'https://science.nasa.gov/moon/'},
{id:'mars',name:'Sao Hỏa',kind:'Hành tinh đất đá',position:[15,0,0],radius:1.08,color:'#b65f43',landable:true,real:true,description:'Sa mạc đỏ với núi lửa, hẻm vực và dấu tích nước cổ đại.',sourceUrl:'https://science.nasa.gov/mars/'},
{id:'phobos',name:'Phobos',kind:'Vệ tinh Sao Hỏa',position:[18.4,1.8,0],radius:.22,color:'#8d8179',landable:true,real:true,description:'Vệ tinh nhỏ, méo mó của Sao Hỏa.',sourceUrl:'https://science.nasa.gov/mars/moons/phobos/'},
{id:'deimos',name:'Deimos',kind:'Vệ tinh Sao Hỏa',position:[19.6,-1.2,0],radius:.16,color:'#9a9086',landable:true,real:true,description:'Vệ tinh nhỏ bên ngoài của Sao Hỏa.',sourceUrl:'https://science.nasa.gov/mars/moons/deimos/'},
{id:'ceres',name:'Ceres',kind:'Hành tinh lùn',position:[27,3,-2],radius:.42,color:'#a9a6a1',landable:true,real:true,description:'Hành tinh lùn lớn nhất và vật thể lớn nhất vành đai tiểu hành tinh.',sourceUrl:'https://science.nasa.gov/dwarf-planets/ceres/'},
{id:'vesta',name:'Vesta',kind:'Tiểu hành tinh',position:[25,-3,2],radius:.27,color:'#a79a8e',landable:true,real:true,description:'Tiểu hành tinh được tàu Dawn khảo sát cận cảnh.',sourceUrl:'https://science.nasa.gov/solar-system/asteroids/4-vesta/'},
{id:'jupiter',name:'Sao Mộc',kind:'Hành tinh khí khổng lồ',position:[42,0,0],radius:3.25,color:'#c79b79',landable:false,real:true,description:'Hành tinh khí khổng lồ; không có bề mặt rắn để hạ cánh.',sourceUrl:'https://science.nasa.gov/jupiter/'},
{id:'io',name:'Io',kind:'Vệ tinh Sao Mộc',position:[47,0,1],radius:.54,color:'#d7bd73',landable:true,real:true,description:'Thế giới núi lửa hoạt động mạnh.',sourceUrl:'https://science.nasa.gov/jupiter/moons/io/'},
{id:'europa',name:'Europa',kind:'Vệ tinh Sao Mộc',position:[50,1,-1],radius:.5,color:'#c9b9a0',landable:true,real:true,description:'Thế giới băng có bằng chứng về đại dương nước mặn bên dưới.',sourceUrl:'https://science.nasa.gov/jupiter/moons/europa/'},
{id:'ganymede',name:'Ganymede',kind:'Vệ tinh Sao Mộc',position:[53,-1,1],radius:.72,color:'#938c83',landable:true,real:true,description:'Vệ tinh lớn nhất Hệ Mặt Trời.',sourceUrl:'https://science.nasa.gov/jupiter/moons/ganymede/'},
{id:'callisto',name:'Callisto',kind:'Vệ tinh Sao Mộc',position:[56,1,1],radius:.65,color:'#77716b',landable:true,real:true,description:'Thế giới cổ xưa với bề mặt dày đặc hố va chạm.',sourceUrl:'https://science.nasa.gov/jupiter/moons/callisto/'},
{id:'saturn',name:'Sao Thổ',kind:'Hành tinh khí khổng lồ',position:[73,0,0],radius:2.9,color:'#c9b18b',landable:false,real:true,description:'Hành tinh khí có hệ vành đai rộng; không có bề mặt rắn.',sourceUrl:'https://science.nasa.gov/saturn/'},
{id:'titan',name:'Titan',kind:'Vệ tinh Sao Thổ',position:[78,0,1],radius:.76,color:'#c58e50',landable:true,real:true,description:'Vệ tinh có khí quyển dày và hồ methane lỏng.',sourceUrl:'https://science.nasa.gov/saturn/moons/titan/'},
{id:'enceladus',name:'Enceladus',kind:'Vệ tinh Sao Thổ',position:[81,1,-1],radius:.34,color:'#e0e7ec',landable:true,real:true,description:'Thế giới băng phun vật chất từ đại dương dưới bề mặt.',sourceUrl:'https://science.nasa.gov/saturn/moons/enceladus/'},
{id:'uranus',name:'Sao Thiên Vương',kind:'Hành tinh băng khổng lồ',position:[99,0,0],radius:2.15,color:'#83c8cc',landable:false,real:true,description:'Hành tinh băng khổng lồ có trục quay nghiêng lớn.',sourceUrl:'https://science.nasa.gov/uranus/'},
{id:'neptune',name:'Sao Hải Vương',kind:'Hành tinh băng khổng lồ',position:[123,0,0],radius:2.15,color:'#426bd0',landable:false,real:true,description:'Hành tinh xanh xa xôi với gió khí quyển rất mạnh.',sourceUrl:'https://science.nasa.gov/neptune/'},
{id:'triton',name:'Triton',kind:'Vệ tinh Sao Hải Vương',position:[127,1,1],radius:.55,color:'#b9a7a2',landable:true,real:true,description:'Vệ tinh lớn của Sao Hải Vương, có hoạt động địa chất lạnh.',sourceUrl:'https://science.nasa.gov/neptune/moons/triton/'},
{id:'pluto',name:'Sao Diêm Vương',kind:'Hành tinh lùn',position:[146,0,0],radius:.58,color:'#bca99a',landable:true,real:true,description:'Thế giới băng ở vành đai Kuiper, được New Horizons khảo sát.',sourceUrl:'https://science.nasa.gov/dwarf-planets/pluto/'},
{id:'charon',name:'Charon',kind:'Vệ tinh Sao Diêm Vương',position:[149,1,0],radius:.32,color:'#8e8b8a',landable:true,real:true,description:'Vệ tinh lớn nhất của Sao Diêm Vương.',sourceUrl:'https://science.nasa.gov/dwarf-planets/pluto/moons/'},
{id:'bennu',name:'Bennu',kind:'Tiểu hành tinh',position:[31,5,3],radius:.14,color:'#85776c',landable:true,real:true,description:'Tiểu hành tinh được OSIRIS-REx lấy mẫu.',sourceUrl:'https://science.nasa.gov/solar-system/asteroids/101955-bennu/'},
{id:'ryugu',name:'Ryugu',kind:'Tiểu hành tinh',position:[34,6,-2],radius:.15,color:'#786b60',landable:true,real:true,description:'Tiểu hành tinh được Hayabusa2 khảo sát và lấy mẫu.',sourceUrl:'https://science.nasa.gov/solar-system/asteroids/162173-ryugu/'},
{id:'comet-67p',name:'Sao chổi 67P',kind:'Sao chổi',position:[61,7,2],radius:.2,color:'#8d8b84',landable:true,real:true,description:'Sao chổi được tàu Rosetta đồng hành khảo sát.',sourceUrl:'https://science.nasa.gov/solar-system/comets/67p-churyumov-gerasimenko/'}
];
const COLORS=['#8d7de0','#62b8b2','#d58c73','#8da9db','#b9a1c9','#8fbf91'];
export function makeImaginedWorlds(sector:number):Body[] {
 let seed=84191+sector*991; const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const names=['Asterion','Lumen Vale','Nacre','Veloria','Serein','Eidolon','Mira Sol','Orphia'];
 return Array.from({length:4},(_,i)=>({id:`sector-${sector}-world-${i}`,name:names[Math.floor(random()*names.length)]+(sector>1?` ${sector}`:''),kind:'Thế giới hư cấu · Sinh tự động',position:[170+sector*32+i*7,(random()-.5)*18,(random()-.5)*24] as [number,number,number],radius:.8+random()*1.1,color:COLORS[Math.floor(random()*COLORS.length)],landable:true,real:false,description:'Thế giới hư cấu được tạo bằng thuật toán procedural theo mã vùng; không phải dữ liệu thiên văn hay kết quả AI.'}));
}
