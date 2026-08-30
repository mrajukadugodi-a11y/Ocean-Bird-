with open('src/components/OceanGamingLotteryPortalView.tsx', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'className={}' in line:
        print(f'Replacing line {idx+1}')
        lines[idx] = '''          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lottery-winnings-bank'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}\n'''

with open('src/components/OceanGamingLotteryPortalView.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Done fixing!')
