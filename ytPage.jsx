import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'youtube_story_channel_checklist_v2';

// ========== CHECKLIST COMPLETO ==========
const initialChecklist = [
  {
    category: '1. Núcleo de criação de conteúdo (Brasil + EUA)',
    items: [
      { id: 'c1', text: 'Escrever 3 histórias originais (esqueleto de 500 palavras cada)', done: false },
      { id: 'c2', text: 'Usar IA para expandir histórias em roteiros de 10-15 minutos (PT-BR)', done: false },
      { id: 'c3', text: 'Criar documento de configuração de personagens e worldbuilding', done: false },
      { id: 'c4', text: 'Definir posicionamento do canal EUA (histórias originais em inglês, não tradução direta)', done: false },
      { id: 'c5', text: 'Escrever 1 roteiro original em inglês para teste do canal EUA', done: false },
    ],
  },
  {
    category: '2. Produção de áudio e imagem',
    items: [
      { id: 'p1', text: 'Configurar conta ElevenLabs e testar voz em português', done: false },
      { id: 'p2', text: 'Configurar ElevenLabs versão em inglês e testar narração', done: false },
      { id: 'p3', text: 'Gerar 20 imagens de cenas no Midjourney/Flux (prompts em PT e EN)', done: false },
      { id: 'p4', text: 'Aprender movimento de câmera básico (Ken Burns) no CapCut', done: false },
      { id: 'p5', text: 'Produzir primeiro vídeo longo completo (PT-BR) como piloto', done: false },
    ],
  },
  {
    category: '3. Publicação e otimização',
    items: [
      { id: 'pub1', text: 'Criar thumbnail A/B para o primeiro vídeo (Canva)', done: false },
      { id: 'pub2', text: 'Configurar TubeBuddy e pesquisar 5 palavras-chave de baixa concorrência (PT)', done: false },
      { id: 'pub3', text: 'Pesquisar 5 palavras-chave em inglês para o canal EUA', done: false },
      { id: 'pub4', text: 'Agendar publicação do primeiro vídeo longo no canal BR', done: false },
      { id: 'pub5', text: 'Analisar gráfico de retenção do primeiro vídeo e ajustar gancho de abertura', done: false },
    ],
  },
  {
    category: '4. Crescimento e monetização (canal BR)',
    items: [
      { id: 'g1', text: 'Cortar 3 Shorts do primeiro vídeo longo', done: false },
      { id: 'g2', text: 'Colocar link do vídeo longo na descrição dos Shorts', done: false },
      { id: 'g3', text: 'Atingir 500 inscritos e ativar recursos intermediários (se disponível)', done: false },
      { id: 'g4', text: 'Atingir 1.000 inscritos + 4.000 horas e aplicar ao YPP', done: false },
      { id: 'g5', text: 'Configurar AdSense e vincular conta bancária brasileira', done: false },
    ],
  },
  {
    category: '5. Operação de canal internacional (EUA)',
    items: [
      { id: 'intl1', text: 'Confirmar que o país de residência no YouTube Studio é Brasil (não pode falsificar)', done: false },
      { id: 'intl2', text: 'Preencher formulário fiscal W-8BEN e entender retenção de 30% sobre receita de views nos EUA', done: false },
      { id: 'intl3', text: 'Configurar Remessa Online ou conta bancária brasileira para receber AdSense', done: false },
      { id: 'intl4', text: 'Publicar primeiro vídeo do canal EUA (2-3x/semana para testar)', done: false },
      { id: 'intl5', text: 'Comparar RPM do canal BR vs EUA após 30 dias e decidir prioridade', done: false },
    ],
  },
  {
    category: '6. Rastreamento e metas',
    items: [
      { id: 'm1', text: 'Criar planilha de rastreamento semanal (inscritos, horas, receita estimada)', done: false },
      { id: 'm2', text: 'Definir meta mensal de uploads (mínimo 12 vídeos longos/mês no BR)', done: false },
      { id: 'm3', text: 'Revisar RPM e retenção a cada 30 dias e ajustar estratégia', done: false },
    ],
  },
];

// ========== ETAPAS DE EXECUÇÃO ==========
const steps = [
  {
    title: 'Etapa 1: Validar nicho e criar 3 episódios piloto (semana 1-2)',
    content: 'Não busque perfeição. Use suas histórias originais + IA para expandir em 3 roteiros de 10-12 minutos. Grave com voz IA, use 15-20 imagens estáticas com movimento de câmera lento. Publique em dias alternados. Objetivo: testar CTR e retenção. NÃO comece o canal EUA ainda.',
  },
  {
    title: 'Etapa 2: Estabelecer ritmo de produção e começar Shorts (semana 3-6)',
    content: 'Mantenha 1 vídeo longo a cada dois dias no canal BR. Todo vídeo longo deve ser cortado em 2-3 Shorts (momento de reviravolta ou suspense). Coloque link do vídeo longo na descrição do Shorts. Shorts não conta horas de exibição, mas é a alavanca mais rápida para crescimento de inscritos.',
  },
  {
    title: 'Etapa 3: Otimização e testes A/B (mês 2-3)',
    content: 'Use TubeBuddy para testar A/B de thumbnails. Analise o gráfico de retenção do YouTube Studio: se houver queda óbvia nos primeiros 30 segundos, modifique o gancho de abertura. Se houver queda no meio, reduza trechos explicativos. Objetivo: aumentar a retenção média de 30% para 40%+.',
  },
  {
    title: 'Etapa 4: Acelerar para 1.000 inscritos + 4.000 horas (mês 3-6)',
    content: 'Aumente para 1 vídeo longo por dia, ou pelo menos 5 por semana. Duração de cada vídeo: 15-20 minutos (mais fácil acumular horas de exibição do que 8 minutos). Foque em séries ou temas: por exemplo, "série de suspense psicológico", para que o público que gostou de um episódio assista aos outros.',
  },
  {
    title: 'Etapa 5: Aplicar ao YPP e monetizar canal BR (após atingir o limite)',
    content: 'Assim que atingir 1.000 inscritos + 4.000 horas, solicite o YPP imediatamente. A análise leva cerca de 30 dias. Após aprovação, vincule o AdSense. Os primeiros R$ 1.000 podem vir do acúmulo de visualizações dos vídeos longos + receita de Super Thanks.',
  },
  {
    title: 'Etapa 6: Lançar canal americano (após estabilização do canal BR)',
    content: 'Não lance dois canais simultaneamente. Após 10-15 vídeos no canal brasileiro com produção estável, comece a preparar o canal americano. Foque em histórias universais de suspense/reviravolta, evite barreiras culturais. Faça upload de 2-3 vídeos por semana para testar CTR do público americano. Esteja ciente da retenção de 30% sobre receita de views nos EUA, mas mesmo assim o valor líquido provavelmente será maior que o do canal brasileiro (RPM EUA ~US$3,50 × 0,7 = US$2,45 > RPM BR ~US$1,50).',
  },
  {
    title: 'Etapa 7: Escalar e decidir prioridade entre canais (mês 6-9)',
    content: 'Após 30-60 dias de operação do canal EUA, compare RPM, retenção e velocidade de crescimento dos dois canais. Se o canal EUA estiver performando melhor, aumente gradualmente os recursos investidos nele, ou até torne-o o principal. Mantenha o canal BR como base de receita estável. Meta final: R$ 1.000/mês combinados, com possibilidade de ultrapassar esse valor se o canal EUA decolar.',
  },
];

// ========== COMPONENTE PRINCIPAL ==========
export default function YouTubeChannelChecklist() {
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialChecklist;
    } catch {
      return initialChecklist;
    }
  });

  const [expandedStep, setExpandedStep] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  const toggleItem = (categoryIndex, itemId) => {
    setChecklist((prev) =>
      prev.map((cat, idx) =>
        idx === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : cat
      )
    );
  };

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const doneItems = checklist.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.done).length,
    0
  );
  const progress = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Cabeçalho e barra de progresso */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            🎬 Plano de lançamento: Canal BR + Canal EUA
          </h1>
          <p className="text-slate-400">
            Meta: R$ 1.000/mês · Estratégia: roteiro original + voz IA + imagens com movimento de câmera
          </p>
          <p className="text-sm text-amber-400">
            ⚠️ Lançar primeiro o canal BR, depois o canal EUA (não simultaneamente)
          </p>
          <div className="w-full bg-slate-800 rounded-full h-4">
            <div
              className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-emerald-400">
            Progresso: {progress}% ({doneItems}/{totalItems})
          </p>
        </div>

        {/* Checklist */}
        <div className="grid gap-6 md:grid-cols-2">
          {checklist.map((category, catIdx) => (
            <div
              key={category.category}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-emerald-300 mb-4">
                {category.category}
              </h2>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleItem(catIdx, item.id)}
                      className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer shrink-0"
                    />
                    <span
                      className={`text-sm transition-colors ${
                        item.done
                          ? 'line-through text-slate-500'
                          : 'text-slate-200'
                      }`}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Acordeão de etapas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-emerald-300">
            🧭 Etapas de execução
          </h2>
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedStep(expandedStep === idx ? -1 : idx)
                  }
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 transition flex justify-between items-center"
                >
                  <span className="font-medium text-slate-100 text-sm md:text-base">
                    {step.title}
                  </span>
                  <span className="text-slate-400 text-lg shrink-0 ml-2">
                    {expandedStep === idx ? '−' : '+'}
                  </span>
                </button>
                {expandedStep === idx && (
                  <div className="px-4 py-3 bg-slate-950 text-slate-300 text-sm leading-relaxed">
                    {step.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparativo de RPM */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-300 mb-4">
            💰 Comparativo realista de RPM (vídeos longos)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="pb-2 pr-4">País</th>
                  <th className="pb-2 pr-4">RPM aprox.</th>
                  <th className="pb-2 pr-4">Retenção fiscal</th>
                  <th className="pb-2">RPM líquido aprox.</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                <tr className="border-b border-slate-800">
                  <td className="py-2 pr-4">🇧🇷 Brasil</td>
                  <td className="py-2 pr-4">US$ 0,80 – 3,50</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">US$ 0,80 – 3,50</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">🇺🇸 EUA</td>
                  <td className="py-2 pr-4">US$ 3,50 – 5,04</td>
                  <td className="py-2 pr-4">~30% (sem tratado)</td>
                  <td className="py-2">US$ 2,45 – 3,53</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Mesmo com retenção de 30%, o RPM líquido do canal EUA tende a ser maior que o do canal BR. Mas o público americano não se inscreve mais facilmente — cada view vale mais, não cada inscrito.
          </p>
        </div>

        {/* Nota de rodapé */}
        <p className="text-xs text-slate-600 text-center">
          Progresso salvo automaticamente no localStorage · Atualize a página sem perder dados
        </p>
      </div>
    </div>
  );
}
