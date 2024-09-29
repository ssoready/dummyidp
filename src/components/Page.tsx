import React, { useEffect } from "react";
import { Outlet } from "react-router";

const logMessage = `
  /$$$$$$  /$$$$$$ /$$      /$$/$$            
 /$$__  $$/$$__  $| $$$    /$$| $$            
| $$  \\__| $$  \\ $| $$$$  /$$$| $$            
|  $$$$$$| $$$$$$$| $$ $$/$$ $| $$            
 \\____  $| $$__  $| $$  $$$| $| $$            
 /$$  \\ $| $$  | $| $$\\  $ | $| $$            
|  $$$$$$| $$  | $| $$ \\/  | $| $$$$$$$$      
 \\______/|__/  |__|__/     |__|________/      
                                              
                                              
                                              
 /$$   /$$/$$          /$$$$$$                
| $$  | $| $$         /$$__  $$               
| $$  | $| $$/$$   /$| $$  \\__/$$$$$$         
| $$$$$$$| $| $$  | $| $$$$  /$$__  $$        
|_____  $| $| $$  | $| $$_/ | $$$$$$$$        
      | $| $| $$  | $| $$   | $$_____/        
      | $| $|  $$$$$$| $$   |  $$$$$$$        
      |__|__/\\____  $|__/    \\_______/        
             /$$  | $$                        
            |  $$$$$$/                        
             \\______/                         
`;

export function Page() {
  useEffect(() => {
    console.log(logMessage);
  }, []);

  return (
    <div>
      <div className="relative mx-auto max-w-7xl">
        <div className="absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] rotate-[-10deg] rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div></div>

        <Outlet />
      </div>
    </div>
  );
}
