import React from 'react';
// بما أننا حذفنا WorldCupApp، سنقوم باستيراد المكون الرئيسي مباشرة من مكان تواجده
// إذا كنت قد وضعت الكود في App.tsx نفسه أو في ملف آخر، تأكد من المسار الصحيح
// ولكن للأمان، سأفترض أنك تريد عرض واجهة بسيطة مباشرة هنا:

export default function App() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#0a0c24',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>Application Coupe du Monde 2026</h1>
      <p>Interface Glassify en cours de chargement...</p>
    </div>
  );
}
