import React, { useState } from 'react';
import mockThreats from './data/mockThreats.json';
import mockShipments from './data/mockShipments.json';
import LogisticsMap from './components/LogisticsMap';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  AlertTriangle, 
  Settings, 
  Package, 
  TrendingDown, 
  ShieldAlert,
  Activity,
  Search,
  Filter,
  X // <-- NEW ICON FOR CLOSE BUTTON
} from 'lucide-react';

function App() {
  const[activeTab, setActiveTab] = useState('dashboard');
  
  // NEW STATES FOR THE MODAL
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const[simulationText, setSimulationText] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  // MOCK Function
  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setIsSimulateModalOpen(false);
      setSimulationText('');
      alert("Backend not connected yet.");
    }, 2000);
  };

  const renderDashboard = () => (
    <>
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Risk Prediction Overview</h2>
          <p className="text-slate-400 text-sm mt-1">Live monitoring of global logistics infrastructure</p>
        </div>
        <div className="flex items-center gap-2 text-sm px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
          <Activity className="w-4 h-4 animate-pulse" /> Live Status: Secure
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
          <div className="text-slate-400 text-sm mb-2">Total Active Shipments</div>
          <div className="text-3xl font-bold text-white">1,248</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-red-900 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-red-500/10 rounded-bl-full"></div>
          <div className="text-slate-400 text-sm mb-2">Shipments at Risk</div>
          <div className="text-3xl font-bold text-red-400">54</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
          <div className="text-slate-400 text-sm mb-2">AI Detected Threats</div>
          <div className="text-3xl font-bold text-orange-400">3</div>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            Financial Exposure <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">$1.2M</div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-[400px]">
        <div className="flex-[2] bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden shadow-lg relative z-0">
          <div className="p-4 border-b border-slate-700 bg-slate-800/50 z-10 relative">
            <h3 className="font-semibold flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-blue-400" /> Global Logistics Map
            </h3>
          </div>
          <div className="flex-1 relative z-0">
             <LogisticsMap />
          </div>
        </div>

        <div className="flex-[1] bg-slate-800 rounded-xl border border-slate-700 flex flex-col shadow-lg">
           <div className="p-4 border-b border-slate-700 bg-slate-800/50">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" /> Live AI Threat Feed
            </h3>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto">
            {mockThreats.map((threat) => (
              <div key={threat.id} className="bg-slate-900 border border-slate-700 p-4 rounded-lg hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-orange-400">{threat.threat_type}</span>
                  <span className={`text-xs px-2 py-1 rounded border ${
                    threat.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  }`}>
                    {threat.severity}
                  </span>
                </div>
                <div className="text-sm text-slate-300 mb-1">📍 {threat.location}</div>
                <div className="text-sm text-slate-400 flex justify-between mt-3 pt-3 border-t border-slate-800">
                  <span>📦 {threat.affected_shipments} Orders</span>
                  <span className={threat.status === 'Rerouted' ? 'text-blue-400' : 'text-red-400'}>
                    {threat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 font-sans overflow-hidden relative">
      
      {/* 1. LEFT SIDEBAR */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <ShieldAlert className="text-blue-500 w-8 h-8" />
          <h1 className="text-xl font-bold tracking-wider">SupplyGuard</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('map')} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === 'map' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>
            <MapIcon className="w-5 h-5" /> Global Map
          </button>
          <button onClick={() => setActiveTab('shipments')} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === 'shipments' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>
            <Package className="w-5 h-5" /> Active Shipments
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}>
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        {/* SIMULATE BUTTON UPDATED */}
        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={() => setIsSimulateModalOpen(true)} 
            className="w-full py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" /> Simulate Threat
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full p-6 gap-6 overflow-y-auto">
        {activeTab === 'dashboard' && renderDashboard()}
        
        {activeTab === 'map' && (
          <div className="flex-1 flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg relative z-0">
             <div className="p-4 border-b border-slate-700 bg-slate-800/50 z-10 relative">
              <h2 className="text-2xl font-bold text-white">Interactive Logistics Map</h2>
            </div>
            <div className="flex-1 relative z-0">
              <LogisticsMap />
            </div>
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="flex-1 flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Active Shipments</h2>
                <p className="text-slate-400 text-sm mt-1">Manage and track all global logistics routes.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-500" />
                  <input type="text" placeholder="Search Order ID..." className="bg-slate-900 border border-slate-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-64 transition-colors" />
                </div>
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors border border-slate-600">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Product Category</th>
                    <th className="p-4 font-medium">Source</th>
                    <th className="p-4 font-medium">Destination</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {mockShipments.map((shipment, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-4 font-medium text-blue-400">{shipment.order_id}</td>
                      <td className="p-4 text-slate-300">{shipment.product}</td>
                      <td className="p-4 text-slate-300">{shipment.source}</td>
                      <td className="p-4 text-slate-300">{shipment.destination}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          shipment.status === 'In Transit' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          shipment.status === 'Delayed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          shipment.status === 'At Risk' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{shipment.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">System Settings</h2>
            <p className="text-slate-400"></p>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 3. SIMULATE THREAT MODAL (POPUP) */}
      {/* ========================================= */}
      {isSimulateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" /> Simulate Global Disruption
              </h3>
              <button 
                onClick={() => setIsSimulateModalOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-600 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-300 mb-4 text-sm">
                Paste unstructured text from a news article, tweet, or weather report. The AI will extract the entities (Location, Threat Level) and cross-reference our active logistics map.
              </p>
              
              <textarea
                className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[140px] resize-none mb-2"
                placeholder="Example: A massive category 4 hurricane is making landfall in Miami today, shutting down all major port operations for the next 48 hours..."
                value={simulationText}
                onChange={(e) => setSimulationText(e.target.value)}
              ></textarea>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsSimulateModalOpen(false)} 
                  className="px-5 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors font-medium border border-transparent hover:border-slate-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSimulate}
                  disabled={isSimulating || !simulationText.trim()}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-medium shadow-lg shadow-red-900/20"
                >
                  {isSimulating ? (
                    <><Activity className="w-5 h-5 animate-spin" /> Analyzing Text...</>
                  ) : (
                    <><ShieldAlert className="w-5 h-5" /> Run AI Analysis</>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;