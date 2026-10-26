const lines: Record<string, string[]> = {
  'THE FIGHT IS IN YOU.': ['THE FIGHT', 'IS IN YOU.'],
  'THE ART OF DEFENCE.': ['THE ART', 'OF DEFENCE.'],
  'THE UNIFORM OF THE UNBROKEN.': ['THE UNIFORM', 'OF THE UNBROKEN.'],
  'A LEGACY IN MOTION.': ['A LEGACY', 'IN MOTION.'],
  'NOT BORN TO STAND STILL.': ['NOT BORN', 'TO STAND', 'STILL.'],
  'YOUR CREW. ONE JIWA.': ['YOUR CREW.', 'ONE JIWA.'],
  'BUILT TO MOVE WITH YOU.': ['BUILT TO', 'MOVE WITH YOU.'],
  "WE'RE IN YOUR CORNER.": ["WE'RE IN", 'YOUR CORNER.'],
  'PERTARUNGAN DI DALAM JIWA ANDA.': ['PERTARUNGAN', 'DI DALAM', 'JIWA ANDA.'],
  'SERAGAM JIWA YANG TIDAK TUNDUK.': ['SERAGAM JIWA', 'YANG TIDAK TUNDUK.'],
  'SENI PERTAHANAN DIRI.': ['SENI', 'PERTAHANAN', 'DIRI.'],
  'WARISAN DALAM PERGERAKAN.': ['WARISAN', 'DALAM', 'PERGERAKAN.'],
  'TIDAK DILAHIRKAN UNTUK PEGUN.': ['TIDAK', 'DILAHIRKAN', 'UNTUK PEGUN.'],
  'PASUKAN ANDA. SATU JIWA.': ['PASUKAN ANDA.', 'SATU JIWA.'],
  'DIBINA UNTUK BERGERAK BERSAMA ANDA.': ['DIBINA UNTUK', 'BERGERAK', 'BERSAMA ANDA.'],
  'KAMI DI SUDUT ANDA.': ['KAMI DI', 'SUDUT ANDA.'],
};

/** Deliberate line breaks matching the approved editorial references. */
export function CampaignLines({ text }: { text: string }) {
  const lineArray = lines[text] ?? [text];
  return (
    <>
      {lineArray.map((line, idx) => (
        <span className="campaign-line block" key={idx}>
          {line}
        </span>
      ))}
    </>
  );
}
