'use client';
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { id: 1, nameJP: "アトラス・ノワール", nameEN: "Atlas Noir Espresso", category: "CHAUD", desc: "Dark roast, cedar smoke, bitter orange peel", price: "35 MAD", img: "https://picsum.photos/seed/atlasnoir/400/300" },
  { id: 2, nameJP: "サクラ・ラテ", nameEN: "Latte Sakura", category: "CHAUD", desc: "Espresso, oat milk, cherry blossom syrup, rose foam", price: "55 MAD", img: "https://picsum.photos/seed/sakuralatte/400/300" },
  { id: 3, nameJP: "サフラン・コルタード", nameEN: "Cortado Safran", category: "CHAUD", desc: "Espresso, saffron-infused whole milk, 1:1 ratio", price: "45 MAD", img: "https://picsum.photos/seed/cortadosafran/400/300" },
  { id: 4, nameJP: "ミント・マッチャ", nameEN: "Matcha Menthe", category: "CHAUD", desc: "Ceremonial matcha, Moroccan spearmint, raw honey", price: "50 MAD", img: "https://picsum.photos/seed/matcha/400/300" },
  { id: 5, nameJP: "アトラス・コールド", nameEN: "Atlas Froid", category: "FROID", desc: "Cold brew 20h, Moroccan argan finish, on ice", price: "48 MAD", img: "https://picsum.photos/seed/coldbrew2/400/300" },
  { id: 6, nameJP: "ローズ・ミルク", nameEN: "Lait de Rose", category: "FROID", desc: "Cold espresso, rosewater, oat milk, crushed ice", price: "55 MAD", img: "https://picsum.photos/seed/rosemilk/400/300" },
  { id: 7, nameJP: "ゆず・スプリッツァー", nameEN: "Yuzu Spritzer", category: "FROID", desc: "Cold brew, yuzu cordial, sparkling water, mint", price: "45 MAD", img: "https://picsum.photos/seed/yuzu/400/300" },
  { id: 8, nameJP: "ラベンダー・グラッセ", nameEN: "Glacé Lavande", category: "FROID", desc: "Espresso poured over lavender ice cream", price: "50 MAD", img: "https://picsum.photos/seed/lavendar/400/300" },
  { id: 9, nameJP: "アルガン・クロワッサン", nameEN: "Croissant Argan", category: "NOURRITURE", desc: "Laminated dough, argan oil butter, orange blossom honey", price: "28 MAD", img: "https://picsum.photos/seed/croissant/400/300" },
  { id: 10, nameJP: "ムスクの大福", nameEN: "Mochi Musc", category: "NOURRITURE", desc: "Homemade mochi, musk rose filling, Moroccan spice dusting", price: "35 MAD", img: "https://picsum.photos/seed/mochi/400/300" },
  { id: 11, nameJP: "サクラ・ノワール", nameEN: "Sakura Noir ✦", category: "SPÉCIAUX", desc: "Ethiopian single-origin, cherry blossom water, rose cardamom", price: "120 MAD", specialBg: "ÉDITION LIMITÉE", img: "https://picsum.photos/seed/sakuranoir/400/300" },
  { id: 12, nameJP: "アトラス×京都", nameEN: "Atlas × Kyoto", category: "SPÉCIAUX", desc: "Tasting flight: three espresso shots, three origins, one cup", price: "95 MAD", specialBg: "SIGNATURE", img: "https://picsum.photos/seed/flight/400/300" }
];

const categories = ["TOUT", "CHAUD", "FROID", "NOURRITURE", "SPÉCIAUX"];

export function MenuGrid() {
  const [activeTab, setActiveTab] = useState("TOUT");
  const filtered = activeTab === "TOUT" ? menuItems : menuItems.filter(i => i.category === activeTab);
  
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="flex gap-6 mb-12 flex-wrap items-center justify-center font-mono text-sm tracking-widest relative">
         {categories.map(cat => (
           <button 
             key={cat} 
             onClick={() => setActiveTab(cat)}
             className={`pb-2 relative transition-colors ${activeTab === cat ? 'text-saffron' : 'text-washi/50 hover:text-washi'}`}
           >
             {cat}
             {activeTab === cat && (
               <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron"></motion.div>
             )}
           </button>
         ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id} 
              className="glass p-6 md:p-8 rounded-lg pointer-events-auto border border-saffron/15 hover:border-saffron/50 transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(212,175,55,0.15)] bg-atlas/80 flex flex-col"
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 zellige mix-blend-overlay ${item.category === 'CHAUD' ? 'bg-marrakech' : item.category === 'FROID' ? 'bg-hammam' : item.category === 'NOURRITURE' ? 'bg-saffron' : 'bg-torii'}`}></div>
              
              {item.specialBg && (
                <div className={`absolute top-4 right-4 z-20 text-[9px] font-mono tracking-widest px-2 py-1 rounded-full ${item.specialBg === 'ÉDITION LIMITÉE' ? 'bg-saffron text-atlas animate-pulse' : 'bg-marrakech text-white'}`}>
                  {item.specialBg}
                </div>
              )}
              
              <div className="w-full h-40 relative rounded-md overflow-hidden mb-6 filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]">
                  <Image 
                    src={item.img} 
                    alt={item.nameEN} 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-atlas/40 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="font-jp text-[11px] text-washi/55 mb-1">{item.nameJP}</div>
              <h3 className="font-display text-xl text-washi mb-3">{item.nameEN}</h3>
              
              <p className="font-sans text-sm text-washi/65 mb-6 line-clamp-2 leading-relaxed flex-grow">{item.desc}</p>
              
              <div className="flex justify-between items-end mt-auto">
                <span className="font-mono text-saffron text-lg">{item.price}</span>
                <button className="text-[10px] font-mono text-washi/70 hover:text-[#4ade80] transition-colors bg-white/5 px-3 py-1.5 rounded hover:bg-[#4ade80]/10">
                  AJOUTER +
                </button>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-washi/5 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none transform skew-x-[-20deg]"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
