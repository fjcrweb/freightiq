'use client';

import React from 'react';
import Link from 'next/link';
import { Anchor, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white border-t border-navy-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-2">
              <Anchor size={20} />
              <span>FreightIQ</span>
            </div>
            <p className="text-sm text-blue-200">
              L'intelligence du fret mondial, simplifiée.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/indices" className="hover:text-white">Indices</Link></li>
              <li><Link href="/routes" className="hover:text-white">Routes</Link></li>
              <li><Link href="/ports" className="hover:text-white">Ports</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Tarification</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Ressources</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/apprendre" className="hover:text-white">Apprendre</Link></li>
              <li><Link href="/actualites" className="hover:text-white">Actualités</Link></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <Mail size={16} />
              <a href="mailto:info@freightiq.com" className="hover:text-white">
                info@freightiq.com
              </a>
            </div>
          </div>
        </div>

        <hr className="border-navy-700 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
          <p>
            Données mises à jour quotidiennement depuis Baltic Exchange, Freightos, MarineTraffic
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
            <a href="#" className="hover:text-white">Conditions</a>
          </div>
        </div>

        <p className="text-xs text-blue-300 mt-6 text-center">
          ⚠️ FreightIQ est une plateforme d'information. Les données sont fournies à titre indicatif uniquement.
        </p>
      </div>
    </footer>
  );
};
