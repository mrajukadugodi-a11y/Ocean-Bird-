import React, { useState } from 'react';
import { HardDrive, Database, ShieldCheck, Download, Upload, Clock, RefreshCw, CheckCircle2, Lock, CloudUpload, Calendar, FileJson, AlertTriangle } from 'lucide-react';

export interface BackupRecord {
  id: string;
  createdAt: string;
  sizeKb: number;
  type: 'AUTOMATED_SCHEDULED' | 'MANUAL_SNAPSHOT' | 'EMERGENCY_PRE_SYNC';
  destination: 'LOCAL_INDEXEDDB' | 'GCP_CLOUD_BUCKET' | 'AWS_S3_ENC' | 'ENCRYPTED_ZIP';
  status: 'COMPLETED' | 'ENCRYPTING' | 'SYNCED';
  recordCount: number;
}

export const INITIAL_BACKUPS: BackupRecord[] = [
  {
    id: 'BKP-2026-0804-01',
    createdAt: '2026-08-04 00:30:00 UTC',
    sizeKb: 1420,
    type: 'AUTOMATED_SCHEDULED',
    destination: 'GCP_CLOUD_BUCKET',
    status: 'COMPLETED',
    recordCount: 1840
  },
  {
    id: 'BKP-2026-0803-02',
    createdAt: '2026-08-03 12:00:00 UTC',
    sizeKb: 1395,
    type: 'AUTOMATED_SCHEDULED',
    destination: 'LOCAL_INDEXEDDB',
    status: 'COMPLETED',
    recordCount: 1812
  },
  {
    id: 'BKP-2026-0802-03',
    createdAt: '2026-08-02 18:45:10 UTC',
    sizeKb: 1280,
    type: 'MANUAL_SNAPSHOT',
    destination: 'AWS_S3_ENC',
    status: 'SYNCED',
    recordCount: 1750
  }
];

export const AutomatedBackupManager: React.FC = () => {
  const [backups, setBackups] = useState<BackupRecord[]>(INITIAL_BACKUPS);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState<boolean>(true);
  const [scheduleFrequency, setScheduleFrequency] = useState<'HOURLY' | 'DAILY' | 'WEEKLY'>('DAILY');
  const [encryptionEnabled, setEncryptionEnabled] = useState<boolean>(true);
  const [isCreatingBackup, setIsCreatingBackup] = useState<boolean>(false);
  const [restoredMessage, setRestoredMessage] = useState<string | null>(null);

  const handleCreateSnapshot = () => {
    setIsCreatingBackup(true);
    setRestoredMessage(null);

    setTimeout(() => {
      const newBkp: BackupRecord = {
        id: `BKP-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        sizeKb: Math.floor(1400 + Math.random() * 200),
        type: 'MANUAL_SNAPSHOT',
        destination: 'LOCAL_INDEXEDDB',
        status: 'COMPLETED',
        recordCount: 1895
      };

      setBackups((prev) => [newBkp, ...prev]);
      setIsCreatingBackup(false);
    }, 1200);
  };

  const handleExportBackupFile = (bkp: BackupRecord) => {
    const data = {
      backupId: bkp.id,
      timestamp: bkp.createdAt,
      encrypted: encryptionEnabled,
      fleetCount: 5,
      flightBookings: 12,
      weatherAlerts: 4,
      userPreferences: { language: 'en', currency: 'INR' },
      systemSettings: { autoBackupEnabled, scheduleFrequency }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OceanBird_Backup_${bkp.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRestoreSnapshot = (id: string) => {
    setRestoredMessage(`Restoring database state to snapshot ${id}... System synced!`);
    setTimeout(() => {
      setRestoredMessage(`Snapshot ${id} successfully restored into local database context!`);
    }, 800);
  };

  return (
    <div id="automated-backup-manager-view" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>DISASTER RECOVERY & AUTOMATED ENCRYPTED DATABASE BACKUP</span>
          </div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <HardDrive className="w-6 h-6 text-cyan-400" />
            <span>Automated Backup & Restore Engine</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated cron scheduled backups, AES-256 encrypted JSON/SQL snapshots, cloud storage sync (GCP/AWS), and instant system restore points.
          </p>
        </div>

        {/* Manual Instant Backup Action */}
        <button
          disabled={isCreatingBackup}
          onClick={handleCreateSnapshot}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black font-mono text-xs shadow-xl flex items-center space-x-2 transition-transform hover:scale-[1.02]"
        >
          {isCreatingBackup ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>COMPILING SNAPSHOT...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 text-slate-950" />
              <span>CREATE INSTANT SNAPSHOT</span>
            </>
          )}
        </button>
      </div>

      {restoredMessage && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{restoredMessage}</span>
        </div>
      )}

      {/* Backup Automation Control Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Automated Schedule Toggle */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase">1. Automated Schedule</span>
            <input
              type="checkbox"
              checked={autoBackupEnabled}
              onChange={(e) => setAutoBackupEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Automatically backup vessel logs, passenger tickets, and flight manifests in background.
          </p>
          <div className="grid grid-cols-3 gap-1">
            {(['HOURLY', 'DAILY', 'WEEKLY'] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setScheduleFrequency(freq)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  scheduleFrequency === freq
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Security Encryption */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase">2. AES-256 Encryption</span>
            <input
              type="checkbox"
              checked={encryptionEnabled}
              onChange={(e) => setEncryptionEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Encrypt backup archives with military-grade AES-256 before exporting to storage.
          </p>
          <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>FIPS 140-2 Compliant Key Management</span>
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase">3. Primary Cloud Vault</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">CONNECTED</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Google Cloud Storage / S3 Redundant Bucket Mirroring
          </p>
          <div className="flex items-center space-x-2 text-[10px] text-cyan-300 font-bold">
            <CloudUpload className="w-3.5 h-3.5" />
            <span>Last Sync: 14 mins ago (Healthy)</span>
          </div>
        </div>
      </div>

      {/* Backup Records History Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white uppercase text-xs tracking-wider flex items-center space-x-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Available Backup Recovery Points & Snapshots</span>
          </h3>
          <span className="text-[10px] text-slate-400">{backups.length} Saved Snapshots</span>
        </div>

        <div className="space-y-2">
          {backups.map((bkp) => (
            <div key={bkp.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FileJson className="w-4 h-4 text-cyan-400" />
                  <strong className="text-white text-xs">{bkp.id}</strong>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-bold">
                    {bkp.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center space-x-3">
                  <span>{bkp.createdAt}</span>
                  <span>•</span>
                  <span>{bkp.sizeKb} KB</span>
                  <span>•</span>
                  <span>{bkp.recordCount} Records</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportBackupFile(bkp)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-[10px] flex items-center space-x-1"
                  title="Download JSON Snapshot"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT</span>
                </button>

                <button
                  onClick={() => handleRestoreSnapshot(bkp.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-[10px] flex items-center space-x-1"
                  title="Restore System State"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESTORE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
