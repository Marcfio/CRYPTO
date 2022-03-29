import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import openseaLogo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { useWeb3 } from '@3rdweb/hooks'






const style = {
  wrapper: `bg-[#04110d] w-screen px-[1.8rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {


  return (

    <div className={style.wrapper}>
       <Link href="/">
         <div className={style.logoContainer}>
           <Image src={openseaLogo} height={40} width={40} />
           <div className={style.logoText}>Josè Marketplace</div>
         </div>
       </Link>
        <div className={style.searchBar}>
         <div className={style.searchIcon}>
           < AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <Link href="/collections/0x2f17d60163AfCe9c00A0f7A893097215D1Aa65F0">
          <div className={style.headerItem}> Collections </div>
        </Link>
        <div className={style.headerItem}> SWAP </div>
        <div className={style.headerItems}>
          <Link href="/create">
            <div className={style.headerItem}> Create</div>
          </Link>
        <div className={style.headerItem}> policy here </div>
        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>


        <div className={style.headerIcon}>

        </div>
    </div>


      // </div>



      //</div>
    //</div>
  )
}

export default Header
