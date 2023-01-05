export function RedPack() {
  return (
    <>
      <div className='m-0 flex h-full w-full flex-col items-center rounded-xl bg-[#A5423A] '>
        {/* <!--  红包的顶部盖子 --> */}
        <div className='m-0 h-[25%] w-full  rounded-xl rounded-b-[50px] border border-[#BD503A]  bg-[#BD503A] shadow-xl'></div>
        {/* <!-- 拆红包的按钮 --> */}
        <div className='mix-auto mt-[-15%] h-[80px]   w-[80px] rounded-full border border-[#FFA73A] bg-[#FFA73A]  text-center shadow-xl'>
          <p className='mt-[30%] font-bold text-gray-200'>open</p>
        </div>
      </div>
    </>
  );
}

// .redpack {
//     height: 450px;
//     background: #A5423A;
//     width: 300px;
//     left: 0;
//     top: 0;
//     border-radius: 10px;
//     margin: 0 auto;
// }

// .topcontent {
//     height: 300px;
//     border: 1px solid #BD503A;
//     background-color: #BD503A;
//     border-radius: 10px 10px 50% 50% / 10px 10px 15% 15%;
//     box-shadow: 0px 4px 0px -1px rgba(0,0,0,0.2);
// }

// #redpack-open {
//     width: 100px;
//     height: 100px;
//     border: 1px solid #FFA73A;
//     background-color: #FFA73A;
//     border-radius: 50%;
//     color: #fff;
//     font-size: 20px;
//     display: inline-block;
//     margin-top: -50px;
//     box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.2);
// }
