import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Gap = "invisivel" | "generico" | "defasado";

interface Question {
  text: string;
  options: { label: string; value: Gap }[];
}

const questions: Question[] = [
  {
    text: "Quando um cliente em potencial chega até você, o que acontece com mais frequência?",
    options: [
      { label: "Ele precisa de uma conversa longa antes de entender o que eu faço", value: "invisivel" },
      { label: "Ele chega interessado, mas compara com outras opções antes de decidir", value: "generico" },
      { label: "Ele não corresponde ao perfil que eu quero atender", value: "defasado" },
    ],
  },
  {
    text: "Quando você perde uma venda, qual o motivo mais comum?",
    options: [
      { label: "O cliente não entendeu bem o valor antes de decidir", value: "invisivel" },
      { label: "Encontrou algo parecido por um preço mais acessível", value: "generico" },
      { label: "Era um cliente que não tinha o perfil certo para o que ofereço", value: "defasado" },
    ],
  },
  {
    text: "Como você descreveria sua comunicação hoje?",
    options: [
      { label: "Explica o que faço, mas raramente chega antes de eu explicar pessoalmente", value: "invisivel" },
      { label: "Está ativa e presente, mas não filtra quem realmente quero atrair", value: "defasado" },
      { label: "Mostra o que entrego, mas parece com o que outros no mercado também mostram", value: "generico" },
    ],
  },
  {
    text: "O que acontece depois que o cliente compra?",
    options: [
      { label: "Fica surpreso com a entrega — ele não esperava tanto", value: "invisivel" },
      { label: "Fica satisfeito, mas dificilmente indica com clareza o que me diferencia", value: "generico" },
      { label: "Fica satisfeito, mas percebo que não era exatamente o cliente que eu queria atender", value: "defasado" },
    ],
  },
  {
    text: "Qual situação é mais comum na sua rotina?",
    options: [
      { label: "Preciso me apresentar e justificar o valor em quase todas as negociações", value: "invisivel" },
      { label: "Estou presente, produzo, apareço — mas o cliente certo não chega com consistência", value: "defasado" },
      { label: "Tenho clientes, mas sinto que poderia cobrar mais se minha marca comunicasse melhor", value: "generico" },
    ],
  },
];

const results: Record<Gap, { title: string; paragraphs: string[] }> = {
  invisivel: {
    title: "O valor existe. A marca não o comunica.",
    paragraphs: [
      "Sua marca não aparece antes de você aparecer.",
      "O que você entrega é real — mas ele só fica visível depois do contato, da reunião, da conversa.",
      "Antes disso, o cliente não tem como saber o que te separa de qualquer outro.",
      "Então ele hesita. Pede desconto. Compara. Ou simplesmente não decide.",
      "O problema não é o que você faz. É que sua marca não comunica isso antes de você abrir a boca.",
    ],
  },
  generico: {
    title: "Sua marca entrega mais do que parece entregar.",
    paragraphs: [
      "Você tem qualidade. Tem resultado. Tem histórico.",
      "Mas o que a sua marca comunica não diferencia do que o mercado inteiro também diz.",
      "O cliente reconhece competência, mas não percebe diferença suficiente para escolher com clareza.",
      "Aí o preço vira o único critério. E a comparação com o concorrente passa a fazer sentido para ele.",
      "O gap não está na entrega. Está no território que a sua marca ainda não ocupou.",
    ],
  },
  defasado: {
    title: "Sua marca ainda fala com quem você era.",
    paragraphs: [
      "O negócio mudou. A entrega ficou mais sofisticada. O cliente ideal mudou.",
      "Mas a marca ainda comunica o que fazia sentido dois ou três anos atrás.",
      "O cliente que chega não é o que você quer atender — porque a marca está falando com quem você atendia antes.",
      "Você cresceu. A marca ficou para trás.",
      "E o cliente que você realmente quer atrair não se reconhece no que vê.",
    ],
  },
};

const closing = [
  "Esse gap não aparece de uma hora para outra.",
  "Ele se instala enquanto o negócio cresce e a marca fica parada.",
  "E enquanto ele existir, sua marca vai continuar dependendo de esforço para vender o que deveria atrair.",
  "A Análise de Posicionamento lê exatamente onde esse gap está — e o que precisaria mudar para sua marca comunicar o que você já entrega.",
];

const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type Screen = "intro" | "quiz" | "result";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<Gap, number>>({ invisivel: 0, generico: 0, defasado: 0 });

  const handleStart = () => setScreen("quiz");

  const handleAnswer = (value: Gap) => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen("result");
    }
  };

  const getResult = (): Gap => {
    const { invisivel, generico, defasado } = scores;
    if (invisivel >= generico && invisivel >= defasado) return "invisivel";
    if (generico >= defasado) return "generico";
    return "defasado";
  };

  const handleRestart = () => {
    setScreen("intro");
    setCurrentQ(0);
    setScores({ invisivel: 0, generico: 0, defasado: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {screen === "intro" && (
            <motion.div
              key="intro"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
                Sua marca está comunicando o que você entrega?
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Se o cliente só percebe o valor depois que compra, existe um gap entre o que sua marca comunica e o que sua operação entrega.
                </p>
                <p>Esse diagnóstico vai te mostrar onde ele está.</p>
                <p className="text-foreground font-medium">
                  Responda com base no que realmente acontece hoje.
                </p>
              </div>
              <button
                onClick={handleStart}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-base"
              >
                Começar
              </button>
            </motion.div>
          )}

          {screen === "quiz" && (
            <motion.div
              key={`q-${currentQ}`}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 text-muted-foreground text-sm font-medium tracking-wide uppercase">
                <span>Pergunta {currentQ + 1}</span>
                <span className="text-border">—</span>
                <span>{questions.length}</span>
              </div>

              <div className="w-full h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                {questions[currentQ].text}
              </h2>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left px-6 py-4 rounded-lg border border-border bg-card hover:border-accent hover:bg-secondary transition-all duration-200 text-base leading-relaxed"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === "result" && (
            <motion.div
              key="result"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                  Seu diagnóstico
                </p>
                <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
                  {results[getResult()].title}
                </h1>
              </div>

              <div className="space-y-4 text-lg leading-relaxed">
                {results[getResult()].paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                    className={i === 0 ? "font-medium text-foreground" : "text-muted-foreground"}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <div className="border-t border-border pt-10 space-y-4">
                {closing.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                    className={`text-base leading-relaxed ${
                      i === closing.length - 1
                        ? "text-foreground font-medium italic font-display text-lg"
                        : "text-muted-foreground"
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="flex flex-col gap-4"
              >
                <a
                  href="https://bncantunes.typeform.com/to/m0s7HoE9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-base text-center"
                >
                  Quero entender o posicionamento da minha marca
                </a>
                <button
                  onClick={handleRestart}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm underline underline-offset-4"
                >
                  Refazer diagnóstico
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
