import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1, { state: "sorry, page doesnt exist" })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className='h-96 flex justify-center items-center'>
      <div className='loader'></div>
    </div>
  )
}

export default Loading



// import React, { useEffect, useRef } from 'react';

// const AnimatedComponent = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     let a = [];
//     let I = 30;
//     let h = "";

//     const intervalId = setInterval(() => {
//       h = "";
//       for (let i = 0; i++ < 630; ) {
//         h += i % 30 ? "`*"[a[i] = ~~((a[i] + a[i + 1] + a[i + 29] + a[i + 30]) / 4)] || 8 : "\n";
//       }
//       containerRef.current.innerHTML = h;
//     }, 100);

//     return () => clearInterval(intervalId);
//   }, []);

//   return <pre ref={containerRef} />;
// };

// export default AnimatedComponent;
