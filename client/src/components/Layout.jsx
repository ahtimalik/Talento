import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-secondary-900">
            <Header />
            {/* Pt-20 accommodates the fixed header (which can vary from py-4 to py-2) */}
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
