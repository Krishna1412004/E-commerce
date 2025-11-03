'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm mb-4">
                            Your trusted destination for premium smartphones and accessories. 
                            We bring you the latest technology at competitive prices.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-white transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-white transition-colors">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-white transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Product Categories */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories/smartphones" className="hover:text-white transition-colors">
                                    Smartphones
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories" className="hover:text-white transition-colors">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/cases" className="hover:text-white transition-colors">
                                    Cases & Covers
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/chargers" className="hover:text-white transition-colors">
                                    Chargers & Cables
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/screen-protectors" className="hover:text-white transition-colors">
                                    Screen Protectors
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <Phone size={20} />
                                <span>+1 (234) 567-8900</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} />
                                <span>support@phonestore.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin size={20} />
                                <span>123 Tech Street, Digital City, 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">
                            © {new Date().getFullYear()} Phone Store. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6 text-sm">
                                <li>
                                    <Link href="/terms" className="hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sitemap" className="hover:text-white transition-colors">
                                        Sitemap
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 