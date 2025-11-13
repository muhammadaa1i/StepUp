export const ConfirmDialogStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes scaleIn { from { opacity:0; transform: scale(.95) } to { opacity:1; transform: scale(1) } }
    .animate-fadeIn { animation: fadeIn .15s ease-out; }
    .animate-scaleIn { animation: scaleIn .18s cubic-bezier(.22,.75,.35,1); }
  `}</style>
);
