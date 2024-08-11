import React from 'react'
import TopBar from '../headers/top-bar'
import Navbar from '../headers/navbar'
import Footer from '../footer/footer'

const PageLayout = ({ children }) => {
    return (
        <>
            <TopBar></TopBar>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </>
    )
}

export default PageLayout
