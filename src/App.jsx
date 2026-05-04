import { useState, useEffect, useRef } from "react";

// ── SEED DATA ─────────────────────────────────────────────────────────────────
const SEED = [
  { id:"1",  cliente:"POLIEDRO", projeto:"Elaboração",              inicio:"2026-04-09", prazo:"2026-04-24", prazoAjuste:"", valor:680,  status:"Finalizado",  pago:true,  nf:"A emitir", obs:"1º e 2º ano" },
  { id:"2",  cliente:"OPET",     projeto:"Autoria 2 EM - Cap. 1",   inicio:"2026-03-16", prazo:"2026-03-24", prazoAjuste:"", valor:1320, status:"Finalizado",  pago:true,  nf:"Emitida",  obs:"" },
  { id:"3",  cliente:"OPET",     projeto:"Autoria 2 EM - Cap. 2",   inicio:"2026-03-25", prazo:"2026-04-03", prazoAjuste:"", valor:1200, status:"Finalizado",  pago:true,  nf:"Emitida",  obs:"" },
  { id:"4",  cliente:"OPET",     projeto:"Autoria 2 EM - Cap. 3",   inicio:"2026-04-04", prazo:"2026-04-15", prazoAjuste:"", valor:1200, status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"5",  cliente:"MLETRAS",  projeto:"Revisão EF6-HIS-U1-C1",   inicio:"2026-04-06", prazo:"2026-04-09", prazoAjuste:"", valor:128,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"6",  cliente:"MLETRAS",  projeto:"Revisão EF6-HIS-U3-C9",   inicio:"2026-04-09", prazo:"2026-04-15", prazoAjuste:"", valor:112,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"7",  cliente:"MLETRAS",  projeto:"Revisão EF6-HIS-U4-C11",  inicio:"2026-04-09", prazo:"2026-04-15", prazoAjuste:"", valor:128,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"8",  cliente:"MLETRAS",  projeto:"Revisão EF6-POR-U1-C1",   inicio:"2026-04-10", prazo:"2026-04-16", prazoAjuste:"", valor:176,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"9",  cliente:"MLETRAS",  projeto:"Revisão EF6-POR-U1-C2",   inicio:"2026-04-10", prazo:"2026-04-16", prazoAjuste:"", valor:120,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"10", cliente:"GOV SP",   projeto:"AF_ART_09_04_01",          inicio:"2026-04-13", prazo:"2026-04-17", prazoAjuste:"2026-05-10", valor:500,  status:"Ajustes",     pago:false, nf:"", obs:"" },
  { id:"11", cliente:"GOV SP",   projeto:"AF_ART_09_04_02",          inicio:"2026-04-13", prazo:"2026-04-17", prazoAjuste:"2026-05-10", valor:500,  status:"Ajustes",     pago:false, nf:"", obs:"" },
  { id:"12", cliente:"GOV SP",   projeto:"AF_ART_09_04_03",          inicio:"2026-04-13", prazo:"2026-04-24", prazoAjuste:"2026-05-15", valor:500,  status:"Ajustes",     pago:false, nf:"", obs:"" },
  { id:"13", cliente:"GOV SP",   projeto:"AF_ART_09_04_04",          inicio:"2026-04-13", prazo:"2026-04-24", prazoAjuste:"2026-05-15", valor:500,  status:"Ajustes",     pago:false, nf:"", obs:"" },
  { id:"14", cliente:"GOV SP",   projeto:"AF_ART_09_04_05",          inicio:"2026-04-13", prazo:"2026-05-01", prazoAjuste:"", valor:500,  status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"15", cliente:"GOV SP",   projeto:"AF_ART_09_04_06",          inicio:"2026-04-13", prazo:"2026-05-01", prazoAjuste:"", valor:500,  status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"16", cliente:"OPET",     projeto:"Autoria 1 EFAI - Cap. 4",  inicio:"2026-04-13", prazo:"2026-04-27", prazoAjuste:"", valor:990,  status:"Validação",   pago:false, nf:"", obs:"" },
  { id:"17", cliente:"OPET",     projeto:"Autoria 2 EM - Cap. 4",    inicio:"2026-04-15", prazo:"2026-04-26", prazoAjuste:"", valor:1200, status:"Validação",   pago:false, nf:"", obs:"" },
  { id:"18", cliente:"MLETRAS",  projeto:"Revisão EF6-POR-U7-C1",    inicio:"2026-04-20", prazo:"2026-04-25", prazoAjuste:"", valor:128,  status:"Finalizado",  pago:false, nf:"A emitir", obs:"" },
  { id:"19", cliente:"POLIEDRO", projeto:"Elaboração - 3º ano",       inicio:"2026-04-22", prazo:"2026-04-30", prazoAjuste:"", valor:820,  status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"20", cliente:"POLIEDRO", projeto:"Elaboração - 4º ano",       inicio:"2026-04-22", prazo:"2026-05-04", prazoAjuste:"", valor:720,  status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"21", cliente:"POLIEDRO", projeto:"Elaboração - 5º ano",       inicio:"2026-04-22", prazo:"2026-05-08", prazoAjuste:"", valor:1140, status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"22", cliente:"OPET",     projeto:"Autoria 2 EM - U05C01",     inicio:"2026-04-28", prazo:"2026-05-07", prazoAjuste:"", valor:1200, status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"23", cliente:"OPET",     projeto:"Autoria 1 EFAI - Cap. 5",   inicio:"2026-04-28", prazo:"2026-05-12", prazoAjuste:"", valor:990,  status:"Em processo", pago:false, nf:"", obs:"" },
  { id:"24", cliente:"MLETRAS",  projeto:"REVISAO EF6-GEO-UN8-C16",   inicio:"2026-04-24", prazo:"2026-04-29", prazoAjuste:"", valor:136,  status:"Finalizado",  pago:false, nf:"", obs:"" },
  { id:"25", cliente:"MLETRAS",  projeto:"REVISAO EF6-GEO-UN8-C15",   inicio:"2026-04-24", prazo:"2026-04-29", prazoAjuste:"", valor:128,  status:"Atrasado",    pago:false, nf:"", obs:"" },
  { id:"26", cliente:"MLETRAS",  projeto:"REVISAO EF6-GEO-UN7-C14",   inicio:"2026-04-24", prazo:"2026-04-29", prazoAjuste:"", valor:184,  status:"Finalizado",  pago:false, nf:"", obs:"" },
  { id:"27", cliente:"MLETRAS",  projeto:"REVISAO EF6-GEO-UN6-C12",   inicio:"2026-04-24", prazo:"2026-04-29", prazoAjuste:"", valor:136,  status:"Finalizado",  pago:false, nf:"", obs:"" },
];

const CLIENTES   = ["OPET","MLETRAS","GOV SP","POLIEDRO","Outro"];
const STATUSES   = ["Em processo","Validação","Ajustes","Finalizado","Atrasado"];
const NF_OPTS    = ["A emitir","Emitida","Não aplicável"];
const TABS       = ["inicio","prazos","financeiro","clientes","lista"];
const TAB_ICONS  = { inicio:"◈", prazos:"◷", financeiro:"₢", clientes:"⬡", lista:"≡" };
const TAB_LABELS = { inicio:"Início", prazos:"Prazos", financeiro:"Financeiro", clientes:"Clientes", lista:"Lista" };

// Status que SUSPENDEM o prazo original (não ficam atrasados)
const STATUS_SUSPENDE_PRAZO = ["Validação","Ajustes","Finalizado"];

const C = {
  bg:      "#0D0D0D",
  card:    "#141414",
  card2:   "#1A1A1A",
  border:  "#242424",
  amber:   "#E8A44A",
  teal:    "#4AADA8",
  red:     "#D95F5F",
  green:   "#5FA86D",
  purple:  "#8B6FBE",
  yellow:  "#D4A843",
  text:    "#F0EDE6",
  sub:     "#6B6560",
  sub2:    "#9A9390",
};

const CLIENT_COLOR = {
  "OPET":     C.amber,
  "MLETRAS":  C.purple,
  "GOV SP":   C.teal,
  "POLIEDRO": C.yellow,
  "Outro":    C.sub2,
};

const STATUS_CFG = {
  "Em processo": { color: C.amber,  bg: "#E8A44A18", border: "#E8A44A30" },
  "Validação":   { color: C.purple, bg: "#8B6FBE18", border: "#8B6FBE30" },
  "Ajustes":     { color: C.teal,   bg: "#4AADA818", border: "#4AADA830" },
  "Finalizado":  { color: C.green,  bg: "#5FA86D18", border: "#5FA86D30" },
  "Atrasado":    { color: C.red,    bg: "#D95F5F18", border: "#D95F5F30" },
};

const LS = "fl_v3";

// ── UTILS ─────────────────────────────────────────────────────────────────────
const brl = v => Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const fmtDate = iso => { if(!iso) return "—"; const [y,m,d]=iso.split("-"); return `${d}/${m}/${y}`; };
const mesKey = iso => iso ? iso.slice(0,7) : "";
const nomeMes = ym => { if(!ym) return ""; const [y,m]=ym.split("-"); return new Date(y,m-1,1).toLocaleString("pt-BR",{month:"long",year:"numeric"}); };

function prazoEfetivo(f) {
  if (f.status === "Ajustes" && f.prazoAjuste) return f.prazoAjuste;
  return f.prazo;
}

function diasRestantes(f) {
  const prazo = prazoEfetivo(f);
  if (!prazo) return null;
  if (STATUS_SUSPENDE_PRAZO.includes(f.status) && f.status !== "Ajustes") return null;
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const p = new Date(prazo); p.setHours(0,0,0,0);
  return Math.round((p - hoje) / 86400000);
}

function isRealmenteAtrasado(f) {
  if (STATUS_SUSPENDE_PRAZO.includes(f.status)) return false;
  const d = diasRestantes(f);
  return d !== null && d < 0;
}

function urgencia(f) {
  if (f.status === "Finalizado") return "done";
  if (isRealmenteAtrasado(f)) return "atrasado";
  if (f.status === "Validação") return "suspenso";
  const d = diasRestantes(f);
  if (d === null) return "ok";
  if (d <= 2) return "critico";
  if (d <= 5) return "urgente";
  return "ok";
}

function saudacao() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return { texto:"Bom dia", emoji:"☀️" };
  if (h >= 12 && h < 18) return { texto:"Boa tarde", emoji:"🌤️" };
  return { texto:"Boa noite", emoji:"🌙" };
}

function isConcluido(f) {
  return f.status === "Finalizado" && f.pago;
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(() => {
    try { const s=localStorage.getItem(LS); return s?JSON.parse(s):SEED; } catch { return SEED; }
  });
  const [tab, setTab]         = useState("inicio");
  const [view, setView]       = useState(null); // { type, payload }
  const [toast, setToast]     = useState("");
  const [ajusteModal, setAjusteModal] = useState(null); // freelance aguardando novo prazo
  const [avatar, setAvatar]   = useState(() => localStorage.getItem("fl_avatar")||"");

  function persist(d) { setData(d); try{localStorage.setItem(LS,JSON.stringify(d));}catch{} }
  function showToast(msg) { setToast(msg); setTimeout(()=>setToast(""),2200); }

  function save(f) {
    // Se mudou pra Ajustes e não tem prazoAjuste, pede novo prazo
    if (f.status === "Ajustes" && !f.prazoAjuste) {
      setAjusteModal(f);
      return;
    }
    const updated = f.id
      ? data.map(x => x.id===f.id ? f : x)
      : [{ ...f, id: Date.now().toString() }, ...data];
    persist(updated);
    showToast(f.id ? "Atualizado ✓" : "Adicionado ✓");
    setView(null);
  }

  function confirmAjuste(f, novoPrazo) {
    const fFinal = { ...f, prazoAjuste: novoPrazo };
    const updated = fFinal.id
      ? data.map(x => x.id===fFinal.id ? fFinal : x)
      : [{ ...fFinal, id: Date.now().toString() }, ...data];
    persist(updated);
    setAjusteModal(null);
    showToast("Prazo de ajuste definido ✓");
    setView(null);
  }

  function del(id) {
    persist(data.filter(x=>x.id!==id));
    showToast("Removido");
    setView(null);
  }

  function togglePago(id) {
    persist(data.map(x=>x.id===id?{...x,pago:!x.pago}:x));
  }

  async function exportarDrive() {
    const header = "ID,Cliente,Projeto,Início,Prazo,Prazo Ajuste,Valor,Status,Pago,NF,Obs\n";
    const rows = data.map(f =>
      [f.id,f.cliente,`"${f.projeto}"`,f.inicio,f.prazo,f.prazoAjuste||"",f.valor,f.status,f.pago?"Sim":"Não",f.nf,`"${f.obs||""}"`].join(",")
    ).join("\n");
    const csv = header + rows;
    const hoje = new Date().toISOString().slice(0,10);
    showToast("Exportando para o Drive…");
    // Post via fetch to Drive API through the Anthropic proxy isn't available,
    // so we download as CSV file instead
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `freelances_${hoje}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast("CSV baixado ✓");
  }

  const isForm = view?.type === "form";
  const titleMap = {
    inicio:"Início", prazos:"Prazos", financeiro:"Financeiro",
    clientes:"Clientes", lista:"Lista"
  };

  return (
    <div style={S.root}>
      <style>{CSS}</style>

      {/* HEADER */}
      <header style={S.header}>
        {view
          ? <button style={S.iconBtn} onClick={()=>setView(null)}>←</button>
          : <div style={S.avatarWrap} onClick={()=>document.getElementById("avatarInput").click()}>
              {avatar
                ? <img src={avatar} style={S.avatarImg} alt="avatar"/>
                : <div style={S.avatarPlaceholder}>LC</div>}
              <input id="avatarInput" type="file" accept="image/*" style={{display:"none"}}
                onChange={e=>{
                  const f=e.target.files[0]; if(!f) return;
                  const r=new FileReader(); r.onload=ev=>{
                    setAvatar(ev.target.result);
                    localStorage.setItem("fl_avatar",ev.target.result);
                  }; r.readAsDataURL(f);
                }}/>
            </div>}
        <span style={S.headerTitle}>
          {view ? (view.payload?.id?"Editar":"Novo Freelance") : titleMap[tab]}
        </span>
        {!view
          ? <button style={S.iconBtnAmber} onClick={()=>setView({type:"form",payload:{}})}>＋</button>
          : <span style={{width:36}}/>}
      </header>

      {/* MAIN */}
      <main style={S.main}>
        {!view && tab==="inicio"     && <Inicio data={data} onOpen={f=>setView({type:"form",payload:f})} onTogglePago={togglePago} onExport={exportarDrive}/>}
        {!view && tab==="prazos"     && <Prazos data={data} onOpen={f=>setView({type:"form",payload:f})}/>}
        {!view && tab==="financeiro" && <Financeiro data={data}/>}
        {!view && tab==="clientes"   && <Clientes data={data} onOpen={f=>setView({type:"form",payload:f})}/>}
        {!view && tab==="lista"      && <Lista data={data} onOpen={f=>setView({type:"form",payload:f})} onTogglePago={togglePago}/>}
        {view?.type==="form"         && <Form initial={view.payload} onSave={save} onDelete={del}/>}
      </main>

      {/* BOTTOM NAV */}
      {!view && (
        <nav style={S.nav}>
          {TABS.map(k=>(
            <button key={k} style={{...S.navBtn,...(tab===k?S.navActive:{})}} onClick={()=>setTab(k)}>
              <span style={{fontSize:16}}>{TAB_ICONS[k]}</span>
              <span style={{fontSize:9,letterSpacing:0.5}}>{TAB_LABELS[k]}</span>
            </button>
          ))}
        </nav>
      )}

      {/* MODAL AJUSTE */}
      {ajusteModal && <AjusteModal freelance={ajusteModal} onConfirm={confirmAjuste} onCancel={()=>setAjusteModal(null)}/>}

      {/* TOAST */}
      {toast && <div style={S.toast}>{toast}</div>}
    </div>
  );
}

// ── INICIO ────────────────────────────────────────────────────────────────────
function Inicio({ data, onOpen, onTogglePago, onExport }) {
  const s = saudacao();
  const ativos     = data.filter(f=>!isConcluido(f));
  const total      = data.reduce((s,f)=>s+f.valor,0);
  const recebido   = data.filter(f=>f.pago).reduce((s,f)=>s+f.valor,0);
  const aReceber   = data.filter(f=>!f.pago&&f.status!=="Finalizado").reduce((s,f)=>s+f.valor,0);
  const nfPend     = data.filter(f=>f.nf==="A emitir").length;

  const proximos = ativos
    .filter(f=>urgencia(f)!=="done"&&urgencia(f)!=="suspenso")
    .sort((a,b)=>{
      const da=diasRestantes(a)??999, db=diasRestantes(b)??999;
      return da-db;
    }).slice(0,5);

  const atrasados = data.filter(f=>isRealmenteAtrasado(f));

  return (
    <div style={S.section}>
      {/* Saudação */}
      <div style={S.saudacao}>
        <span style={{fontSize:26}}>{s.emoji}</span>
        <div>
          <div style={S.saudacaoTexto}>{s.texto}, Lucas!</div>
          <div style={S.saudacaoSub}>{data.length} projetos · {ativos.length} em andamento</div>
        </div>
      </div>

      {/* KPIs clicáveis */}
      <div style={S.kpiGrid}>
        <KPI label="Total geral"  value={brl(total)}    accent={C.amber}  />
        <KPI label="Recebido"     value={brl(recebido)} accent={C.green}  />
        <KPI label="A receber"    value={brl(aReceber)} accent={C.yellow} />
        <KPI label="NF pendente"  value={String(nfPend)} accent={C.purple} small/>
      </div>

      {/* Alertas atrasados */}
      {atrasados.length > 0 && (
        <div style={S.alertBox}>
          <div style={S.alertTitle}>🚨 Realmente atrasados</div>
          {atrasados.map(f=>(
            <div key={f.id} style={S.alertItem} onClick={()=>onOpen(f)}>
              <span>{f.projeto}</span>
              <span style={{color:C.red,fontWeight:700}}>{Math.abs(diasRestantes(f))}d atraso</span>
            </div>
          ))}
        </div>
      )}

      {/* Próximos prazos */}
      <div style={S.blockTitle}>Próximos prazos</div>
      {proximos.length===0 && <div style={S.empty}>Nenhum prazo próximo.</div>}
      {proximos.map(f=><CardCompact key={f.id} f={f} onOpen={onOpen} onTogglePago={onTogglePago}/>)}

      {/* Exportar */}
      <button style={S.exportBtn} onClick={onExport}>⬇ Exportar dados (CSV)</button>
    </div>
  );
}

// ── PRAZOS ────────────────────────────────────────────────────────────────────
function Prazos({ data, onOpen }) {
  const ativos = data.filter(f=>f.status!=="Finalizado");

  const grupos = {
    "🚨 Atrasados":    ativos.filter(f=>isRealmenteAtrasado(f)),
    "🔴 Hoje / amanhã":ativos.filter(f=>{ const d=diasRestantes(f); return d!==null&&d>=0&&d<=1; }),
    "🟡 Esta semana":  ativos.filter(f=>{ const d=diasRestantes(f); return d!==null&&d>=2&&d<=7; }),
    "⏸ Suspensos":     ativos.filter(f=>f.status==="Validação"),
    "📋 Ajustes":      ativos.filter(f=>f.status==="Ajustes"),
    "🟢 No prazo":     ativos.filter(f=>{ const d=diasRestantes(f); return d!==null&&d>7; }),
  };

  return (
    <div style={{padding:"12px 16px 80px"}}>
      {Object.entries(grupos).map(([label,items])=>{
        if(!items.length) return null;
        return (
          <div key={label}>
            <div style={S.blockTitle}>{label}</div>
            {items.map(f=><CardPrazo key={f.id} f={f} onOpen={onOpen}/>)}
          </div>
        );
      })}
    </div>
  );
}

// ── FINANCEIRO ────────────────────────────────────────────────────────────────
function Financeiro({ data }) {
  const meses = [...new Set(data.map(f=>mesKey(f.prazo)).filter(Boolean))].sort().reverse();

  return (
    <div style={{padding:"12px 16px 80px"}}>
      <div style={S.blockTitle}>Por mês</div>
      {meses.map(mes=>{
        const items = data.filter(f=>mesKey(f.prazo)===mes);
        const total   = items.reduce((s,f)=>s+f.valor,0);
        const recebido= items.filter(f=>f.pago).reduce((s,f)=>s+f.valor,0);
        const pend    = items.filter(f=>!f.pago).reduce((s,f)=>s+f.valor,0);
        return (
          <div key={mes} style={S.mesCard}>
            <div style={S.mesNome}>{nomeMes(mes)}</div>
            <div style={S.mesRow}>
              <div style={S.mesKpi}>
                <div style={{color:C.amber,fontWeight:700,fontSize:15}}>{brl(total)}</div>
                <div style={S.mesKpiLabel}>Total</div>
              </div>
              <div style={S.mesKpi}>
                <div style={{color:C.green,fontWeight:700,fontSize:15}}>{brl(recebido)}</div>
                <div style={S.mesKpiLabel}>Recebido</div>
              </div>
              <div style={S.mesKpi}>
                <div style={{color:C.yellow,fontWeight:700,fontSize:15}}>{brl(pend)}</div>
                <div style={S.mesKpiLabel}>Pendente</div>
              </div>
            </div>
            <div style={S.mesItens}>
              {items.map(f=>(
                <div key={f.id} style={S.mesItem}>
                  <span style={{fontSize:12,color:C.sub2,flex:1}}>{f.projeto}</span>
                  <span style={{fontSize:12,color:f.pago?C.green:C.sub2,fontWeight:600}}>{brl(f.valor)}</span>
                  <span style={{...S.statusPill,...STATUS_CFG[f.status],marginLeft:6}}>{f.status}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── CLIENTES ──────────────────────────────────────────────────────────────────
function Clientes({ data, onOpen }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{padding:"12px 16px 80px"}}>
      {CLIENTES.filter(c=>data.some(f=>f.cliente===c)).map(c=>{
        const items   = data.filter(f=>f.cliente===c);
        const ativos  = items.filter(f=>!isConcluido(f));
        const total   = items.reduce((s,f)=>s+f.valor,0);
        const recebido= items.filter(f=>f.pago).reduce((s,f)=>s+f.valor,0);
        const cor     = CLIENT_COLOR[c]||C.sub2;
        const isOpen  = open===c;

        return (
          <div key={c} style={{...S.clienteCard, borderLeft:`3px solid ${cor}`}}>
            <div style={S.clienteHeader} onClick={()=>setOpen(isOpen?null:c)}>
              <div>
                <div style={{...S.clienteNome,color:cor}}>{c}</div>
                <div style={S.clienteSub}>{items.length} projetos · {ativos.length} ativos</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>{brl(total)}</div>
                <div style={{fontSize:11,color:C.green}}>{brl(recebido)} recebido</div>
              </div>
              <span style={{color:C.sub,marginLeft:8,fontSize:16}}>{isOpen?"▲":"▼"}</span>
            </div>
            {isOpen && (
              <div style={S.clienteItens}>
                {items.sort((a,b)=>b.prazo?.localeCompare(a.prazo||"")||0).map(f=>(
                  <div key={f.id} style={S.clienteItem} onClick={()=>onOpen(f)}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:C.text,fontWeight:500}}>{f.projeto}</div>
                      <div style={{fontSize:11,color:C.sub}}>Prazo: {fmtDate(prazoEfetivo(f))}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.text}}>{brl(f.valor)}</div>
                      <div style={{...S.statusPill,...STATUS_CFG[f.status]}}>{f.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── LISTA ─────────────────────────────────────────────────────────────────────
function Lista({ data, onOpen, onTogglePago }) {
  const [busca,setBusca]           = useState("");
  const [filterCliente,setFC]      = useState("todos");
  const [filterStatus,setFS]       = useState("todos");
  const [showConcluidos,setSC]     = useState(false);
  const [sortBy,setSort]           = useState("prazo");
  const [filterMes,setFM]          = useState("todos");

  const meses = [...new Set(data.map(f=>mesKey(f.prazo)).filter(Boolean))].sort().reverse();
  const ativos     = data.filter(f=>!isConcluido(f));
  const concluidos = data.filter(f=>isConcluido(f));

  const filtrar = arr => arr
    .filter(f=>filterCliente==="todos"||f.cliente===filterCliente)
    .filter(f=>filterStatus==="todos"||f.status===filterStatus)
    .filter(f=>filterMes==="todos"||mesKey(f.prazo)===filterMes)
    .filter(f=>!busca||f.projeto.toLowerCase().includes(busca.toLowerCase())||f.cliente.toLowerCase().includes(busca.toLowerCase()))
    .sort((a,b)=>{
      if(sortBy==="prazo")  return (prazoEfetivo(a)||"").localeCompare(prazoEfetivo(b)||"");
      if(sortBy==="valor")  return b.valor-a.valor;
      if(sortBy==="cliente")return a.cliente.localeCompare(b.cliente);
      return 0;
    });

  const ativosF    = filtrar(ativos);
  const cluidosF   = filtrar(concluidos);

  return (
    <div>
      <div style={S.searchWrap}>
        <input style={S.searchInput} placeholder="🔍  Buscar…" value={busca} onChange={e=>setBusca(e.target.value)}/>
      </div>
      <div style={{overflowX:"auto",display:"flex",gap:8,padding:"8px 16px"}}>
        <Chip active={filterCliente==="todos"} onClick={()=>setFC("todos")}>Todos</Chip>
        {CLIENTES.filter(c=>data.some(f=>f.cliente===c)).map(c=>(
          <Chip key={c} active={filterCliente===c} onClick={()=>setFC(c)} color={CLIENT_COLOR[c]}>{c}</Chip>
        ))}
      </div>
      <div style={{overflowX:"auto",display:"flex",gap:8,padding:"0 16px 8px"}}>
        <Chip active={filterMes==="todos"} onClick={()=>setFM("todos")} small>Todos meses</Chip>
        {meses.map(m=><Chip key={m} active={filterMes===m} onClick={()=>setFM(m)} small>{nomeMes(m).split(" ")[0]}</Chip>)}
      </div>
      <div style={{overflowX:"auto",display:"flex",gap:8,padding:"0 16px 8px"}}>
        <Chip active={filterStatus==="todos"} onClick={()=>setFS("todos")} small>Todos status</Chip>
        {STATUSES.map(s=><Chip key={s} active={filterStatus===s} onClick={()=>setFS(s)} color={STATUS_CFG[s]?.color} small>{s}</Chip>)}
      </div>
      <div style={{display:"flex",gap:6,padding:"0 16px 8px",alignItems:"center"}}>
        <span style={{fontSize:11,color:C.sub}}>Ord:</span>
        {[["prazo","Prazo"],["valor","Valor"],["cliente","Cliente"]].map(([k,l])=>(
          <Chip key={k} active={sortBy===k} onClick={()=>setSort(k)} small>{l}</Chip>
        ))}
      </div>

      <div style={{padding:"0 16px 80px"}}>
        <div style={S.listCount}>{ativosF.length} projeto{ativosF.length!==1?"s":""} ativos</div>
        {ativosF.map(f=><CardLista key={f.id} f={f} onOpen={onOpen} onTogglePago={onTogglePago}/>)}

        {cluidosF.length>0 && (
          <button style={S.concluidosToggle} onClick={()=>setSC(!showConcluidos)}>
            {showConcluidos?"▲":"▼"} {cluidosF.length} concluído{cluidosF.length!==1?"s":""} e pagos
          </button>
        )}
        {showConcluidos && cluidosF.map(f=><CardLista key={f.id} f={f} onOpen={onOpen} onTogglePago={onTogglePago} dim/>)}
      </div>
    </div>
  );
}

// ── CARDS ─────────────────────────────────────────────────────────────────────
function CardCompact({ f, onOpen, onTogglePago }) {
  const urg = urgencia(f);
  const d   = diasRestantes(f);
  const sc  = STATUS_CFG[f.status]||STATUS_CFG["Em processo"];

  const urgColor = urg==="atrasado"?C.red:urg==="critico"?C.red:urg==="urgente"?C.yellow:C.sub2;

  return (
    <div style={{...S.card, borderLeft:`2px solid ${CLIENT_COLOR[f.cliente]||C.sub}`}} onClick={()=>onOpen(f)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,color:CLIENT_COLOR[f.cliente]||C.sub2,fontWeight:700,marginBottom:2}}>{f.cliente}</div>
          <div style={{fontSize:14,color:C.text,fontWeight:600,lineHeight:1.3}}>{f.projeto}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:700,color:C.text}}>{brl(f.valor)}</div>
          <div style={{...S.statusPill,...sc,marginTop:4}}>{f.status}</div>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
        <span style={{fontSize:12,color:urgColor,fontWeight:urg==="atrasado"?700:400}}>
          {urg==="suspenso" ? "⏸ Prazo suspenso (validação)"
           : urg==="atrasado" ? `🚨 ${Math.abs(d)}d de atraso`
           : urg==="critico" ? `🔴 ${d}d restantes`
           : urg==="urgente" ? `🟡 ${d}d restantes`
           : d!==null ? `📅 ${fmtDate(prazoEfetivo(f))}`
           : "—"}
        </span>
        <button style={{...S.pagoBtn,...(f.pago?S.pagoBtnSim:S.pagoBtnNao)}}
          onClick={e=>{e.stopPropagation();onTogglePago(f.id);}}>
          {f.pago?"✓ Pago":"Pend."}
        </button>
      </div>
    </div>
  );
}

function CardPrazo({ f, onOpen }) {
  const d   = diasRestantes(f);
  const urg = urgencia(f);
  const sc  = STATUS_CFG[f.status];
  const prazoReal = prazoEfetivo(f);

  return (
    <div style={{...S.card, opacity: urg==="suspenso"?0.7:1}} onClick={()=>onOpen(f)}>
      <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:CLIENT_COLOR[f.cliente]||C.sub2,fontWeight:700,marginBottom:2}}>{f.cliente}</div>
          <div style={{fontSize:14,color:C.text,fontWeight:600}}>{f.projeto}</div>
          <div style={{fontSize:12,color:C.sub,marginTop:4}}>
            {f.status==="Ajustes"?"Prazo ajuste: ":"Prazo: "}{fmtDate(prazoReal)}
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          {d!==null && (
            <div style={{fontSize:20,fontWeight:800,color:urg==="atrasado"?C.red:urg==="critico"?C.red:urg==="urgente"?C.yellow:C.teal}}>
              {d<0?`-${Math.abs(d)}`:d}d
            </div>
          )}
          {d===null && <div style={{fontSize:12,color:C.purple}}>⏸</div>}
          <div style={{...S.statusPill,...sc,marginTop:4}}>{f.status}</div>
        </div>
      </div>
    </div>
  );
}

function CardLista({ f, onOpen, onTogglePago, dim }) {
  const sc  = STATUS_CFG[f.status]||STATUS_CFG["Em processo"];
  const urg = urgencia(f);
  const d   = diasRestantes(f);

  return (
    <div style={{...S.card, opacity:dim?0.5:1}} onClick={()=>onOpen(f)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:CLIENT_COLOR[f.cliente]||C.sub2,fontWeight:700,marginBottom:2}}>{f.cliente}</div>
          <div style={{fontSize:14,color:C.text,fontWeight:600,lineHeight:1.3}}>{f.projeto}</div>
          <div style={{fontSize:12,color:C.sub,marginTop:4,display:"flex",gap:8,flexWrap:"wrap"}}>
            <span>📅 {fmtDate(prazoEfetivo(f))}</span>
            {d!==null && !dim && (
              <span style={{color:urg==="atrasado"?C.red:urg==="critico"?C.red:urg==="urgente"?C.yellow:C.sub}}>
                {d<0?`${Math.abs(d)}d atraso`:d===0?"Hoje!":urg==="urgente"?`${d}d`:""}
              </span>
            )}
            {f.nf && <span>🧾 {f.nf}</span>}
          </div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:700,color:C.text}}>{brl(f.valor)}</div>
          <div style={{...S.statusPill,...sc,marginTop:4}}>{f.status}</div>
          <button style={{...S.pagoBtn,...(f.pago?S.pagoBtnSim:S.pagoBtnNao),marginTop:6}}
            onClick={e=>{e.stopPropagation();onTogglePago(f.id);}}>
            {f.pago?"✓ Pago":"Pend."}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FORM ──────────────────────────────────────────────────────────────────────
function Form({ initial, onSave, onDelete }) {
  const [f,setF] = useState({
    cliente:"",projeto:"",inicio:"",prazo:"",prazoAjuste:"",
    valor:"",status:"Em processo",pago:false,nf:"",obs:"",
    ...initial
  });
  const u = (k,v) => setF(p=>({...p,[k]:v}));
  const valid = f.cliente && f.projeto && f.valor;

  return (
    <div style={S.formWrap}>
      <FRow label="Cliente">
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
          {CLIENTES.map(c=><Chip key={c} active={f.cliente===c} onClick={()=>u("cliente",c)} color={CLIENT_COLOR[c]}>{c}</Chip>)}
        </div>
        <input style={{...S.inp,marginTop:8}} placeholder="Ou digite…" value={f.cliente} onChange={e=>u("cliente",e.target.value)}/>
      </FRow>
      <FRow label="Projeto / Serviço *">
        <input style={S.inp} placeholder="Ex: Revisão EF6-HIS-U1-C1" value={f.projeto} onChange={e=>u("projeto",e.target.value)}/>
      </FRow>
      <FRow label="Valor (R$) *">
        <input style={S.inp} type="number" placeholder="0" value={f.valor} onChange={e=>u("valor",parseFloat(e.target.value)||"")}/>
      </FRow>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <div style={{flex:1}}><div style={S.fLabel}>Início</div><input style={S.inp} type="date" value={f.inicio} onChange={e=>u("inicio",e.target.value)}/></div>
        <div style={{flex:1}}><div style={S.fLabel}>Prazo</div><input style={S.inp} type="date" value={f.prazo} onChange={e=>u("prazo",e.target.value)}/></div>
      </div>
      {f.status==="Ajustes" && (
        <FRow label="Prazo do ajuste">
          <input style={S.inp} type="date" value={f.prazoAjuste} onChange={e=>u("prazoAjuste",e.target.value)}/>
        </FRow>
      )}
      <FRow label="Status">
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
          {STATUSES.map(s=><Chip key={s} active={f.status===s} onClick={()=>u("status",s)} color={STATUS_CFG[s]?.color}>{s}</Chip>)}
        </div>
      </FRow>
      <FRow label="Nota Fiscal">
        <div style={{display:"flex",gap:8,marginTop:6}}>
          {NF_OPTS.map(n=><Chip key={n} active={f.nf===n} onClick={()=>u("nf",n)} small>{n}</Chip>)}
        </div>
      </FRow>
      <FRow label="Pago?">
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <button style={{...S.toggleBtn,...(f.pago?S.toggleOn:S.toggleOff)}} onClick={()=>u("pago",true)}>✓ Sim</button>
          <button style={{...S.toggleBtn,...(!f.pago?S.toggleOn:S.toggleOff)}} onClick={()=>u("pago",false)}>✗ Não</button>
        </div>
      </FRow>
      <FRow label="Observações">
        <textarea style={{...S.inp,height:72,resize:"none"}} value={f.obs} onChange={e=>u("obs",e.target.value)} placeholder="Anotações opcionais"/>
      </FRow>
      <button style={{...S.saveBtn,opacity:valid?1:0.4}} disabled={!valid} onClick={()=>onSave(f)}>
        {f.id?"Salvar alterações":"Adicionar freelance"}
      </button>
      {f.id && <button style={S.delBtn} onClick={()=>{if(window.confirm("Excluir?"))onDelete(f.id);}}>Excluir</button>}
    </div>
  );
}

// ── MODAL AJUSTE ──────────────────────────────────────────────────────────────
function AjusteModal({ freelance: f, onConfirm, onCancel }) {
  const [prazo,setPrazo] = useState("");
  return (
    <div style={S.modalOverlay}>
      <div style={S.modalBox}>
        <div style={S.modalTitle}>Prazo do ajuste</div>
        <div style={S.modalSub}>"{f.projeto}" foi movido para Ajustes. Qual é o novo prazo de entrega?</div>
        <input style={{...S.inp,marginTop:12}} type="date" value={prazo} onChange={e=>setPrazo(e.target.value)}/>
        <button style={{...S.saveBtn,opacity:prazo?1:0.4,marginTop:12}} disabled={!prazo} onClick={()=>onConfirm(f,prazo)}>
          Confirmar prazo
        </button>
        <button style={{...S.delBtn,marginTop:8}} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function KPI({ label, value, accent, small }) {
  return (
    <div style={{...S.kpi, borderTop:`2px solid ${accent}`}}>
      <div style={{fontSize:small?14:18,fontWeight:800,color:accent,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{value}</div>
      <div style={{fontSize:10,color:C.sub,marginTop:5,textTransform:"uppercase",letterSpacing:0.6}}>{label}</div>
    </div>
  );
}
function FRow({ label, children }) { return <div style={{marginBottom:16}}><div style={S.fLabel}>{label}</div>{children}</div>; }
function Chip({ children, active, onClick, color, small }) {
  return (
    <button style={{
      ...S.chip, ...(small?{padding:"4px 10px",fontSize:11}:{}),
      ...(active&&color?{background:color+"22",color,borderColor:color}:{}),
      ...(active&&!color?S.chipActive:{})
    }} onClick={onClick}>{children}</button>
  );
}

// ── STYLES & CSS ──────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Archivo:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  body{background:#0D0D0D;}
  input,textarea,button,select{font-family:'Archivo',sans-serif;}
  ::-webkit-scrollbar{display:none;}
  select{appearance:none;}
`;

const S = {
  root:{fontFamily:"'Archivo',sans-serif",background:C.bg,minHeight:"100vh",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",color:C.text},
  header:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:C.card,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:20},
  headerTitle:{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:18,color:C.text,letterSpacing:0.3},
  iconBtn:{background:"none",border:"none",color:C.text,fontSize:22,cursor:"pointer",padding:"4px 8px"},
  iconBtnAmber:{background:C.amber,color:"#0D0D0D",border:"none",borderRadius:"50%",width:34,height:34,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},
  avatarWrap:{width:34,height:34,cursor:"pointer"},
  avatarImg:{width:34,height:34,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.amber}`},
  avatarPlaceholder:{width:34,height:34,borderRadius:"50%",background:C.amber+"30",border:`2px solid ${C.amber}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.amber},
  main:{flex:1,overflowY:"auto",paddingBottom:72},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:20},
  navBtn:{flex:1,background:"none",border:"none",color:C.sub,padding:"10px 0 14px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3},
  navActive:{color:C.amber},
  toast:{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:C.card2,color:C.text,padding:"10px 20px",borderRadius:20,fontSize:13,fontWeight:500,boxShadow:"0 4px 20px rgba(0,0,0,0.6)",zIndex:30,border:`1px solid ${C.border}`},
  section:{padding:"16px 16px 24px"},
  saudacao:{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",background:C.card2,borderBottom:`1px solid ${C.border}`,marginBottom:0},
  saudacaoTexto:{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.text},
  saudacaoSub:{fontSize:12,color:C.sub,marginTop:2},
  kpiGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16,marginTop:16},
  kpi:{background:C.card,borderRadius:12,padding:"12px 14px",border:`1px solid ${C.border}`},
  alertBox:{background:"#D95F5F12",border:`1px solid ${C.red}40`,borderRadius:12,padding:"12px 14px",marginBottom:16},
  alertTitle:{fontSize:12,fontWeight:700,color:C.red,marginBottom:8},
  alertItem:{display:"flex",justifyContent:"space-between",fontSize:13,color:C.text,padding:"4px 0",cursor:"pointer"},
  blockTitle:{fontSize:11,color:C.sub,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10,marginTop:8},
  card:{background:C.card,borderRadius:12,padding:"14px",marginBottom:10,cursor:"pointer",border:`1px solid ${C.border}`},
  statusPill:{borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:600,display:"inline-block",border:"1px solid"},
  pagoBtn:{borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,cursor:"pointer",border:"none",fontFamily:"inherit"},
  pagoBtnSim:{background:"#5FA86D25",color:C.green},
  pagoBtnNao:{background:C.card2,color:C.sub},
  empty:{textAlign:"center",color:C.sub,padding:"32px 20px",fontSize:14},
  exportBtn:{width:"100%",background:"none",color:C.teal,border:`1px solid ${C.teal}40`,borderRadius:12,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:16},
  searchWrap:{padding:"12px 16px 0"},
  searchInput:{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontSize:14,color:C.text,outline:"none"},
  listCount:{fontSize:11,color:C.sub,padding:"8px 0 4px",textTransform:"uppercase",letterSpacing:0.5},
  concluidosToggle:{width:"100%",background:"none",color:C.sub,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px",fontSize:13,cursor:"pointer",marginTop:8,fontFamily:"inherit"},
  mesCard:{background:C.card,borderRadius:14,marginBottom:14,overflow:"hidden",border:`1px solid ${C.border}`},
  mesNome:{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.text,padding:"14px 16px 8px",textTransform:"capitalize"},
  mesRow:{display:"flex",gap:0,borderBottom:`1px solid ${C.border}`},
  mesKpi:{flex:1,padding:"8px 16px 10px",borderRight:`1px solid ${C.border}`},
  mesKpiLabel:{fontSize:10,color:C.sub,marginTop:2,textTransform:"uppercase"},
  mesItens:{padding:"8px 0"},
  mesItem:{display:"flex",alignItems:"center",padding:"6px 16px",gap:8},
  clienteCard:{background:C.card,borderRadius:14,marginBottom:12,overflow:"hidden",border:`1px solid ${C.border}`},
  clienteHeader:{display:"flex",alignItems:"center",gap:8,padding:"14px 16px",cursor:"pointer"},
  clienteNome:{fontSize:15,fontWeight:700},
  clienteSub:{fontSize:12,color:C.sub,marginTop:2},
  clienteItens:{borderTop:`1px solid ${C.border}`,padding:"8px 0"},
  clienteItem:{display:"flex",gap:8,padding:"10px 16px",cursor:"pointer",borderBottom:`1px solid ${C.border}40`},
  chip:{background:C.card2,border:`1px solid ${C.border}`,borderRadius:20,padding:"6px 14px",fontSize:13,color:C.sub,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"},
  chipActive:{background:C.amber+"22",color:C.amber,borderColor:C.amber},
  formWrap:{padding:"16px 16px 60px"},
  fLabel:{fontSize:11,color:C.sub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.6,marginBottom:4},
  inp:{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",fontSize:14,color:C.text,outline:"none",marginTop:4},
  toggleBtn:{flex:1,border:"none",borderRadius:10,padding:"10px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},
  toggleOn:{background:C.amber+"25",color:C.amber},
  toggleOff:{background:C.card2,color:C.sub},
  saveBtn:{width:"100%",background:C.amber,color:"#0D0D0D",border:"none",borderRadius:12,padding:"13px",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8,fontFamily:"inherit"},
  delBtn:{width:"100%",background:"none",color:C.red,border:`1px solid ${C.red}40`,borderRadius:12,padding:"11px",fontSize:14,cursor:"pointer",marginTop:10,fontFamily:"inherit"},
  modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:20},
  modalBox:{background:C.card,borderRadius:16,padding:24,width:"100%",maxWidth:400,border:`1px solid ${C.border}`},
  modalTitle:{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.text,marginBottom:6},
  modalSub:{fontSize:13,color:C.sub,lineHeight:1.5},
};
