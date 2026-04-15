/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toggleSubmissionRead } from '@/app/actions/admin';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SubmissionsTable({ initialData }: { initialData: any[] }) {
  const [submissions, setSubmissions] = useState<any[]>(initialData);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const result = await toggleSubmissionRead(id, !currentStatus);
    if(result.success) {
      toast.success('Durum güncellendi');
      setSubmissions(submissions.map(s => s.id === id ? { ...s, is_read: !currentStatus } : s));
    } else {
      toast.error('Hata oluştu');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b bg-slate-50 text-slate-600 text-sm">
            <th className="py-3 px-4 rounded-tl-lg">Tarih</th>
            <th className="py-3 px-4">Tip</th>
            <th className="py-3 px-4">Detaylar</th>
            <th className="py-3 px-4 text-center">Durum</th>
            <th className="py-3 px-4 text-center rounded-tr-lg">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-500">Henüz hiçbir form başvurusu bulunmuyor.</td>
            </tr>
          )}
          {submissions.map((sub) => {
            const date = new Date(sub.created_at).toLocaleString('tr-TR');
            const data = sub.payload || {};
            
            return (
              <tr key={sub.id} className={`border-b hover:bg-slate-50 transition ${!sub.is_read ? 'bg-blue-50/30' : ''}`}>
                <td className="py-4 px-4 text-sm whitespace-nowrap">{date}</td>
                <td className="py-4 px-4 text-sm font-medium uppercase text-slate-500">{sub.type}</td>
                <td className="py-4 px-4 text-xs space-y-1">
                  <div><strong className="text-slate-800">İsim:</strong> {data.name}</div>
                  <div><strong className="text-slate-800">Email:</strong> {data.email}</div>
                  <div><strong className="text-slate-800">Telefon:</strong> {data.phone}</div>
                  <div><strong className="text-slate-800">Hizmet:</strong> {data.service}</div>
                  <div className="text-slate-600 line-clamp-2 mt-2 border-l-2 border-slate-200 pl-2">
                    {data.message}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.is_read ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {sub.is_read ? 'Okundu' : 'Bekliyor'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <Button 
                    variant={sub.is_read ? "outline" : "default"} 
                    size="sm" 
                    onClick={() => handleToggle(sub.id, sub.is_read)}
                  >
                    {sub.is_read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
