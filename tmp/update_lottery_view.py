import sys

with open('src/components/OceanGamingLotteryPortalView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target_btn = """        <button
          onClick={() => setActiveTab('lottery-analytics')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lottery-analytics'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <LineChart className="w-4 h-4 text-amber-400" />
          <span>Lottery Analytics</span>
        </button>"""

replacement_btn = target_btn + """

        <button
          onClick={() => setActiveTab('lottery-notifications')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'lottery-notifications'
              ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Notification Settings</span>
        </button>"""

assert target_btn in content, 'target_btn not found'
content = content.replace(target_btn, replacement_btn, 1)

# Now add render blocks for jackpot-live-feed, lottery-analytics, and lottery-notifications
end_target = """            )}
          </div>
        </div>
      )}
    </div>
  );
};"""

end_replacement = """            )}
          </div>
        </div>
      )}

      {/* JACKPOT LIVE STREAM VIEW */}
      {activeTab === 'jackpot-live-feed' && (
        <OceanGamingLiveWatchPortalView />
      )}

      {/* LOTTERY WINNER ANALYTICS VIEW */}
      {activeTab === 'lottery-analytics' && (
        <LotteryWinnerAnalyticsView />
      )}

      {/* LOTTERY NOTIFICATION SETTINGS VIEW */}
      {activeTab === 'lottery-notifications' && (
        <LotteryNotificationSettingsView onTriggerTestToast={(msg) => triggerToast(msg)} />
      )}
    </div>
  );
};"""

assert end_target in content, 'end_target not found'
content = content.replace(end_target, end_replacement, 1)

with open('src/components/OceanGamingLotteryPortalView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully integrated button and tab views into OceanGamingLotteryPortalView.tsx!')
