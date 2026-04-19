import React, { useState } from "react";

export default function App() { const [services, setServices] = useState([]); const [form, setForm] = useState({ title: "", price: "", desc: "" });

const addService = () => { if (!form.title || !form.price) return; setServices([...services, { ...form, id: Date.now() }]); setForm({ title: "", price: "", desc: "" }); };

return ( <div className="min-h-screen bg-gray-100 p-6"> <h1 className="text-3xl font-bold mb-6">Service Marketplace</h1>

{/* Add Service */}
  <div className="bg-white p-4 rounded-2xl shadow mb-6">
    <h2 className="text-xl font-semibold mb-3">Add Service</h2>
    <input
      className="border p-2 w-full mb-2 rounded"
      placeholder="Service Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />
    <input
      className="border p-2 w-full mb-2 rounded"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
    />
    <textarea
      className="border p-2 w-full mb-2 rounded"
      placeholder="Description"
      value={form.desc}
      onChange={(e) => setForm({ ...form, desc: e.target.value })}
    />
    <button
      onClick={addService}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Add Service
    </button>
  </div>

  {/* Services List */}
  <div className="grid md:grid-cols-3 gap-4">
    {services.map((s) => (
      <div key={s.id} className="bg-white p-4 rounded-2xl shadow">
        <h3 className="text-lg font-bold">{s.title}</h3>
        <p className="text-gray-600">{s.desc}</p>
        <p className="text-green-600 font-semibold">Rs {s.price}</p>
        <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
          Buy
        </button>
      </div>
    ))}
  </div>
</div>

); }