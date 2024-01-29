import Image from 'next/image'
 

type LogoProp = {
  alt: string
}

export function Logo({alt}:LogoProp) {
  return <Image src={`/logo.svg`} alt={alt} width={83} height={31} sizes="(min-width: 900px) 111px, 41px" style={{ marginLeft: '12px'}} />
}

// <Image src={Logo} width={83} height={31} alt="orange-logo" sizes="(min-width: 900px) 111px, 41px" />