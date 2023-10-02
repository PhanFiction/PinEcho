import React from 'react';
import './Home.css';

const images = [
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
]

const Home = () => {
  return(
    <section className="home-section">
      <div className="img-gallery">
        {
          images.map((item, index) =>
          <div className={'item-container'} key={index}>
            <img src={item} alt={`item ${index}`} />
          </div>
          )
        }
        </div>
    </section>
  )
};

export default Home;