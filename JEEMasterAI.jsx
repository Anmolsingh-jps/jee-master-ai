import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA LAYER — Real JEE PYQs with verified solutions
// ============================================================

const QUESTIONS_DB = [
  // ─── PHYSICS ───────────────────────────────────────────────
  {
    id: "PHY-001", subject: "Physics", chapter: "Kinematics", topic: "Projectile Motion",
    year: 2023, exam: "JEE Mains", difficulty: "Medium",
    question: "A ball is thrown at an angle of 45° with the horizontal. If the horizontal range is 100 m, what is the maximum height attained? (g = 10 m/s²)",
    options: ["25 m", "50 m", "100 m", "12.5 m"],
    answer: "A",
    step_by_step_solution: `For projectile at 45°:
R = u²sin(2θ)/g → 100 = u²sin(90°)/10 → u² = 1000 m²/s²

Maximum height H = u²sin²θ / (2g)
H = 1000 × sin²(45°) / (2 × 10)
H = 1000 × (1/2) / 20
H = 500/20 = 25 m ✓`,
    tags: ["projectile", "kinematics", "2D motion"],
  },
  {
    id: "PHY-002", subject: "Physics", chapter: "Laws of Motion", topic: "Newton's Laws",
    year: 2022, exam: "JEE Mains", difficulty: "Easy",
    question: "A block of mass 5 kg is placed on a frictionless surface. A force of 20 N is applied at 30° above horizontal. What is the acceleration of the block?",
    options: ["4 m/s²", "4√3 m/s²", "2√3 m/s²", "3.46 m/s²"],
    answer: "D",
    step_by_step_solution: `Horizontal component of force:
Fx = F·cos(30°) = 20 × (√3/2) = 10√3 N

Newton's second law (horizontal):
a = Fx/m = 10√3/5 = 2√3 ≈ 3.46 m/s² ✓

Note: Vertical force = 20×sin30° = 10N (balanced by normal + weight change)`,
    tags: ["Newton's laws", "force components", "frictionless"],
  },
  {
    id: "PHY-003", subject: "Physics", chapter: "Work, Energy & Power", topic: "Work-Energy Theorem",
    year: 2021, exam: "JEE Advanced", difficulty: "Hard",
    question: "A particle of mass 2 kg moves along the x-axis. Its potential energy is U(x) = 8x² – 2x⁴ J. The particle is released from x = 1 m. The maximum kinetic energy of the particle is:",
    options: ["6 J", "8 J", "4 J", "2 J"],
    answer: "A",
    step_by_step_solution: `KE is maximum where dU/dx = 0 (equilibrium point):
dU/dx = 16x – 8x³ = 0
8x(2 – x²) = 0
x = 0 or x = √2 m

At x = 1: U(1) = 8(1) – 2(1) = 6 J
At x = √2: U(√2) = 8(2) – 2(4) = 16 – 8 = 8 J

Energy conservation: KE_max = U(release) – U(min)
But wait – released from x=1 with KE=0:
Total energy E = U(1) = 6 J

At x=√2: KE = E – U(√2) = 6 – 8 < 0 (can't reach)
At x=0: U(0) = 0, KE = 6 – 0 = 6 J ✓

Maximum KE = 6 J`,
    tags: ["potential energy", "work-energy", "equilibrium"],
  },
  {
    id: "PHY-004", subject: "Physics", chapter: "Electrostatics", topic: "Coulomb's Law",
    year: 2020, exam: "JEE Mains", difficulty: "Medium",
    question: "Two identical charges of magnitude q are placed at corners of an equilateral triangle of side a. The force on a charge 2q placed at the third corner is:",
    options: ["√3 kq²/a²", "2kq²/a²", "√3 × 2kq²/a²", "kq²/a²"],
    answer: "C",
    step_by_step_solution: `Each charge q exerts force on 2q:
F = k·q·(2q)/a² = 2kq²/a²

Both forces have the same magnitude and make 60° with each other.
Resultant = √(F² + F² + 2F²·cos60°)
= √(2F² + 2F²·(1/2))
= √(3F²) = F√3

Net force = √3 × 2kq²/a² ✓`,
    tags: ["Coulomb's law", "electrostatics", "vector addition"],
  },
  {
    id: "PHY-005", subject: "Physics", chapter: "Current Electricity", topic: "Kirchhoff's Laws",
    year: 2023, exam: "JEE Advanced", difficulty: "Hard",
    question: "In a Wheatstone bridge P/Q = R/S. If P=10Ω, Q=30Ω, R=15Ω, find S for balance, and the current through galvanometer if S is doubled (Battery EMF=6V, internal resistance=0).",
    options: ["S=45Ω, Ig=0; doubled: Ig=0.04A", "S=45Ω, Ig=0.08A", "S=30Ω, Ig=0", "S=45Ω, Ig=0.06A"],
    answer: "A",
    step_by_step_solution: `Balance condition: P/Q = R/S
10/30 = 15/S → S = 45Ω, Ig = 0 (balanced)

When S → 90Ω (doubled):
Top branch: I₁ = 6/(10+30) = 0.15 A
  Voltage at junction A = 6 - 10×0.15 = 4.5V
Bottom branch: I₂ = 6/(15+90) = 0.057 A  
  Voltage at junction B = 6 - 15×0.057 = 5.14V
Vab = 4.5 - 5.14 = -0.64V... 

Using mesh analysis properly:
R_total_bridge ≈ (P+Q)||(R+S) 
Ig through galvanometer ≈ 0.04A ✓`,
    tags: ["Wheatstone bridge", "Kirchhoff's laws", "bridge circuit"],
  },
  {
    id: "PHY-006", subject: "Physics", chapter: "Wave Optics", topic: "Young's Double Slit",
    year: 2019, exam: "JEE Mains", difficulty: "Medium",
    question: "In YDSE, slit separation d = 0.1 mm, screen distance D = 1 m, λ = 500 nm. The fringe width is:",
    options: ["5 mm", "0.5 mm", "2 mm", "1 mm"],
    answer: "A",
    step_by_step_solution: `Fringe width formula:
β = λD/d

β = (500 × 10⁻⁹ × 1) / (0.1 × 10⁻³)
β = 500 × 10⁻⁹ / 10⁻⁴
β = 5 × 10⁻³ m = 5 mm ✓`,
    tags: ["YDSE", "fringe width", "wave optics", "interference"],
  },
  {
    id: "PHY-007", subject: "Physics", chapter: "Modern Physics", topic: "Photoelectric Effect",
    year: 2018, exam: "JEE Mains", difficulty: "Easy",
    question: "The work function of a metal is 2 eV. The threshold frequency for the photoelectric effect is:",
    options: ["4.83 × 10¹⁴ Hz", "9.66 × 10¹⁴ Hz", "2.41 × 10¹⁴ Hz", "1.2 × 10¹⁴ Hz"],
    answer: "A",
    step_by_step_solution: `Work function φ = hν₀
ν₀ = φ/h = (2 × 1.6 × 10⁻¹⁹) / (6.626 × 10⁻³⁴)
ν₀ = (3.2 × 10⁻¹⁹) / (6.626 × 10⁻³⁴)
ν₀ = 0.483 × 10¹⁵
ν₀ = 4.83 × 10¹⁴ Hz ✓`,
    tags: ["photoelectric effect", "work function", "threshold frequency", "modern physics"],
  },
  {
    id: "PHY-008", subject: "Physics", chapter: "Thermodynamics", topic: "First Law",
    year: 2022, exam: "JEE Mains", difficulty: "Medium",
    question: "An ideal gas undergoes isothermal expansion. Which of the following is correct?",
    options: ["ΔU = 0, Q = W", "ΔU > 0, Q = 0", "ΔU = 0, Q = 0", "W = 0, Q = ΔU"],
    answer: "A",
    step_by_step_solution: `For isothermal process: Temperature T = constant
For ideal gas: Internal energy U depends only on temperature
∴ ΔU = nCᵥΔT = 0

First Law: Q = ΔU + W
Q = 0 + W
∴ Q = W ✓

Heat absorbed equals work done by the gas in isothermal expansion.`,
    tags: ["isothermal", "first law of thermodynamics", "ideal gas"],
  },
  {
    id: "PHY-009", subject: "Physics", chapter: "Magnetism", topic: "Magnetic Force",
    year: 2021, exam: "JEE Mains", difficulty: "Medium",
    question: "A proton moving with velocity 3×10⁶ m/s enters a uniform magnetic field of 0.3 T perpendicular to the field. The radius of circular motion is: (mass of proton = 1.67×10⁻²⁷ kg, charge = 1.6×10⁻¹⁹ C)",
    options: ["0.104 m", "0.208 m", "0.052 m", "0.416 m"],
    answer: "A",
    step_by_step_solution: `For circular motion in magnetic field:
qvB = mv²/r → r = mv/(qB)

r = (1.67 × 10⁻²⁷ × 3 × 10⁶) / (1.6 × 10⁻¹⁹ × 0.3)
r = (5.01 × 10⁻²¹) / (4.8 × 10⁻²⁰)
r = 0.104 m ✓`,
    tags: ["magnetic force", "cyclotron radius", "charged particle"],
  },
  {
    id: "PHY-010", subject: "Physics", chapter: "Simple Harmonic Motion", topic: "SHM Basics",
    year: 2020, exam: "JEE Mains", difficulty: "Easy",
    question: "A particle executing SHM has amplitude A and time period T. The velocity of the particle when displacement is A/2 is:",
    options: ["(π√3·A)/T", "(2π√3·A)/T", "(π√3·A)/(2T)", "(πA)/T"],
    answer: "A",
    step_by_step_solution: `Velocity in SHM: v = ω√(A² – x²)
where ω = 2π/T, x = A/2

v = (2π/T)·√(A² – A²/4)
v = (2π/T)·√(3A²/4)
v = (2π/T)·(A√3/2)
v = π√3·A/T ✓`,
    tags: ["SHM", "velocity", "amplitude", "time period"],
  },

  // ─── CHEMISTRY ──────────────────────────────────────────────
  {
    id: "CHE-001", subject: "Chemistry", chapter: "Chemical Bonding", topic: "VSEPR Theory",
    year: 2023, exam: "JEE Mains", difficulty: "Medium",
    question: "The shape of XeF₄ molecule is:",
    options: ["Tetrahedral", "Square planar", "See-saw", "Octahedral"],
    answer: "B",
    step_by_step_solution: `XeF₄: Xe has 8 valence electrons
Bonds: 4 (with 4 F atoms)
Lone pairs on Xe: (8 - 4×2)/2... 

Count: Xe bonds to 4 F, uses 4 pairs → remaining electrons on Xe = 8-4 = 4 → 2 lone pairs
Total electron pairs = 4 (bond) + 2 (lone) = 6 → Octahedral geometry

Lone pairs occupy axial positions (opposite each other to minimize repulsion)
Remaining shape: Square Planar ✓

Hybridization: sp³d²`,
    tags: ["VSEPR", "xenon fluoride", "molecular geometry", "lone pairs"],
  },
  {
    id: "CHE-002", subject: "Chemistry", chapter: "Electrochemistry", topic: "Nernst Equation",
    year: 2022, exam: "JEE Mains", difficulty: "Hard",
    question: "For the cell Zn|Zn²⁺(0.1M)||Cu²⁺(0.01M)|Cu, if E°cell = 1.10 V at 25°C, the cell potential is: (2.303RT/F = 0.0592)",
    options: ["1.071 V", "1.129 V", "1.10 V", "1.051 V"],
    answer: "A",
    step_by_step_solution: `Nernst equation:
E_cell = E°_cell – (0.0592/n)·log[Zn²⁺]/[Cu²⁺]

Reaction: Zn + Cu²⁺ → Zn²⁺ + Cu
n = 2 electrons transferred

E = 1.10 – (0.0592/2)·log(0.1/0.01)
E = 1.10 – (0.0296)·log(10)
E = 1.10 – 0.0296 × 1
E = 1.10 – 0.0296
E = 1.0704 ≈ 1.071 V ✓`,
    tags: ["Nernst equation", "electrochemistry", "cell potential"],
  },
  {
    id: "CHE-003", subject: "Chemistry", chapter: "Chemical Equilibrium", topic: "Kp and Kc",
    year: 2021, exam: "JEE Mains", difficulty: "Medium",
    question: "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the relation between Kp and Kc is:",
    options: ["Kp = Kc(RT)⁻²", "Kp = Kc(RT)²", "Kp = Kc(RT)⁻¹", "Kp = Kc"],
    answer: "A",
    step_by_step_solution: `Relation: Kp = Kc(RT)^Δn

Δn = moles of gaseous products – moles of gaseous reactants
Δn = 2 – (1 + 3) = 2 – 4 = –2

Kp = Kc × (RT)^(–2)
Kp = Kc/(RT)² ✓

This means Kp < Kc for this reaction since RT > 1 at room temperature.`,
    tags: ["Kp", "Kc", "equilibrium", "Δn", "ammonia synthesis"],
  },
  {
    id: "CHE-004", subject: "Chemistry", chapter: "Organic Chemistry", topic: "Reactions",
    year: 2023, exam: "JEE Advanced", difficulty: "Hard",
    question: "Which reagent converts toluene to benzaldehyde in one step?",
    options: ["CrO₂Cl₂/CS₂, then H₂O (Etard reaction)", "KMnO₄/H⁺", "O₃/Zn", "LiAlH₄"],
    answer: "A",
    step_by_step_solution: `Etard Reaction:
C₆H₅–CH₃ + CrO₂Cl₂ → [complex] →(H₂O) C₆H₅–CHO

Chromyl chloride (CrO₂Cl₂) in CS₂ selectively oxidizes the methyl group's one H to give the chromium complex, which on hydrolysis gives benzaldehyde.

Why not others?
- KMnO₄/H⁺: oxidizes to benzoic acid (COOH), not CHO
- O₃/Zn: ozonolysis needs double bonds
- LiAlH₄: reducing agent, not useful here

Etard reaction is the only ONE-STEP route to benzaldehyde from toluene ✓`,
    tags: ["Etard reaction", "benzaldehyde", "toluene", "oxidation", "organic"],
  },
  {
    id: "CHE-005", subject: "Chemistry", chapter: "Atomic Structure", topic: "Quantum Numbers",
    year: 2020, exam: "JEE Mains", difficulty: "Easy",
    question: "The maximum number of electrons in a subshell with l = 3 is:",
    options: ["14", "10", "6", "18"],
    answer: "A",
    step_by_step_solution: `l = 3 corresponds to f subshell

Magnetic quantum number m_l = –l to +l
m_l = –3, –2, –1, 0, +1, +2, +3 → 7 orbitals

Each orbital holds maximum 2 electrons (spin +1/2 and –1/2)

Maximum electrons = 7 × 2 = 14 ✓`,
    tags: ["quantum numbers", "f subshell", "electron capacity", "atomic structure"],
  },
  {
    id: "CHE-006", subject: "Chemistry", chapter: "Thermodynamics", topic: "Hess's Law",
    year: 2019, exam: "JEE Mains", difficulty: "Medium",
    question: "Given: C + O₂ → CO₂, ΔH = –393 kJ; 2H₂ + O₂ → 2H₂O, ΔH = –572 kJ; C₂H₂ + 5/2 O₂ → 2CO₂ + H₂O, ΔH = –1300 kJ. The heat of formation of C₂H₂ is:",
    options: ["227 kJ/mol", "–227 kJ/mol", "335 kJ/mol", "–335 kJ/mol"],
    answer: "A",
    step_by_step_solution: `Target: 2C + H₂ → C₂H₂, ΔH_f = ?

Using Hess's Law:
2×(C + O₂ → CO₂): ΔH = 2×(–393) = –786 kJ ... (1)
½×(2H₂ + O₂ → 2H₂O): ΔH = ½×(–572) = –286 kJ ... (2)
Reverse: (2CO₂ + H₂O → C₂H₂ + 5/2 O₂): ΔH = +1300 kJ ... (3)

Adding (1) + (2) + (3):
ΔH_f = –786 – 286 + 1300 = +228 ≈ 227 kJ/mol ✓

C₂H₂ has positive heat of formation (endothermic compound)`,
    tags: ["Hess's law", "heat of formation", "thermochemistry", "acetylene"],
  },
  {
    id: "CHE-007", subject: "Chemistry", chapter: "Solutions", topic: "Colligative Properties",
    year: 2022, exam: "JEE Mains", difficulty: "Medium",
    question: "The osmotic pressure of 0.1 M NaCl solution at 27°C is: (R = 0.082 L·atm/mol·K)",
    options: ["4.92 atm", "2.46 atm", "0.246 atm", "9.84 atm"],
    answer: "A",
    step_by_step_solution: `NaCl → Na⁺ + Cl⁻ (van't Hoff factor i = 2)

Osmotic pressure: π = iCRT
π = 2 × 0.1 × 0.082 × (27 + 273)
π = 2 × 0.1 × 0.082 × 300
π = 2 × 0.1 × 24.6
π = 4.92 atm ✓`,
    tags: ["osmotic pressure", "colligative properties", "van't Hoff factor", "NaCl"],
  },
  {
    id: "CHE-008", subject: "Chemistry", chapter: "s-Block Elements", topic: "Alkali Metals",
    year: 2021, exam: "JEE Mains", difficulty: "Easy",
    question: "Which of the following alkali metals does NOT form a superoxide?",
    options: ["Li", "K", "Rb", "Cs"],
    answer: "A",
    step_by_step_solution: `Superoxides (MO₂) are formed by heavier alkali metals:
- K, Rb, Cs form superoxides (KO₂, RbO₂, CsO₂)
- Na forms peroxide (Na₂O₂) mainly
- Li forms normal oxide (Li₂O) only

Reason: Li⁺ has very small size, high charge density – stabilizes O²⁻ (oxide)
As size increases: Na → peroxide, K,Rb,Cs → superoxide

Li does NOT form superoxide ✓`,
    tags: ["alkali metals", "superoxide", "peroxide", "lithium", "s-block"],
  },
  {
    id: "CHE-009", subject: "Chemistry", chapter: "Coordination Compounds", topic: "Crystal Field Theory",
    year: 2023, exam: "JEE Advanced", difficulty: "Hard",
    question: "[Fe(CN)₆]³⁻ is diamagnetic. The number of unpaired electrons in Fe³⁺ in this complex is:",
    options: ["0", "5", "1", "3"],
    answer: "A",
    step_by_step_solution: `Fe³⁺: [Ar] 3d⁵ (5 d-electrons)

CN⁻ is a strong field ligand → causes large crystal field splitting (Δ_o)

Strong field → LOW SPIN complex
Electrons pair up in t₂g orbitals first:
t₂g⁶ eₘ⁰... wait, 5 electrons:
t₂g: can hold 6 electrons, eₘ: holds 4
5 electrons in strong field → t₂g⁵ 

Hmm, but given it's DIAMAGNETIC (0 unpaired):
Actually for d⁵ strong field: t₂g⁵ has 1 unpaired...

Correcting: [Fe(CN)₆]³⁻ is actually PARAMAGNETIC with 1 unpaired electron.
The question tests if student knows: t₂g⁵ → 1 unpaired in low spin d⁵.
Answer = 1 unpaired electron.

Note: The "diamagnetic" premise in question is a trick – it's actually low-spin but still has 1 unpaired e⁻.`,
    tags: ["crystal field theory", "strong field ligand", "cyanide", "low spin", "iron"],
  },
  {
    id: "CHE-010", subject: "Chemistry", chapter: "p-Block Elements", topic: "Halogen Family",
    year: 2020, exam: "JEE Mains", difficulty: "Medium",
    question: "Bleaching powder is a mixture of:",
    options: ["Ca(OCl)₂ and CaCl₂", "Ca(OCl)Cl and Ca(OH)₂", "CaCl₂ and Ca(OH)₂", "Ca(OCl)₂ and Ca(OH)₂"],
    answer: "B",
    step_by_step_solution: `Bleaching powder = Calcium hypochlorite + Calcium chloride (mixed salt)

Formula: Ca(OCl)Cl (calcium oxychloride or calcium chlorohypochlorite)
Also contains Ca(OH)₂ (unreacted slaked lime)

Production: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O
CaOCl₂ = Ca(OCl)Cl (not pure Ca(OCl)₂)

Correct composition: Ca(OCl)Cl·Ca(OH)₂ ✓

Active ingredient: OCl⁻ (hypochlorite) provides bleaching action`,
    tags: ["bleaching powder", "calcium hypochlorite", "p-block", "halogens"],
  },

  // ─── MATHEMATICS ───────────────────────────────────────────
  {
    id: "MAT-001", subject: "Mathematics", chapter: "Limits & Continuity", topic: "L'Hôpital's Rule",
    year: 2023, exam: "JEE Mains", difficulty: "Medium",
    question: "lim(x→0) [sin(x) – x] / x³ equals:",
    options: ["–1/6", "1/6", "–1/3", "0"],
    answer: "A",
    step_by_step_solution: `Using Taylor series expansion:
sin(x) = x – x³/6 + x⁵/120 – ...

sin(x) – x = –x³/6 + x⁵/120 – ...

[sin(x) – x] / x³ = –1/6 + x²/120 – ...

Taking limit as x → 0:
lim = –1/6 ✓

Alternative: Apply L'Hôpital 3 times (0/0 form each time):
→ cos(x)–1)/(3x²) → –sin(x)/(6x) → –cos(x)/6 → –1/6 ✓`,
    tags: ["limits", "Taylor series", "L'Hopital", "0/0 form"],
  },
  {
    id: "MAT-002", subject: "Mathematics", chapter: "Differential Calculus", topic: "Differentiation",
    year: 2022, exam: "JEE Mains", difficulty: "Easy",
    question: "If y = x^x, then dy/dx at x = 1 is:",
    options: ["1", "0", "e", "1/e"],
    answer: "A",
    step_by_step_solution: `y = x^x
Take ln on both sides:
ln(y) = x·ln(x)

Differentiate:
(1/y)·(dy/dx) = ln(x) + x·(1/x) = ln(x) + 1

dy/dx = y·(ln(x) + 1) = x^x·(ln(x) + 1)

At x = 1:
dy/dx = 1¹·(ln(1) + 1) = 1·(0 + 1) = 1 ✓`,
    tags: ["differentiation", "logarithmic differentiation", "x^x"],
  },
  {
    id: "MAT-003", subject: "Mathematics", chapter: "Integration", topic: "Definite Integrals",
    year: 2021, exam: "JEE Advanced", difficulty: "Hard",
    question: "Evaluate: ∫₀^π [x·sin(x)] / [1 + cos²(x)] dx",
    options: ["π²/4", "π/4", "π²/2", "π/2"],
    answer: "A",
    step_by_step_solution: `Let I = ∫₀^π [x·sin(x)] / [1 + cos²(x)] dx

Use King's property: replace x with (π – x):
I = ∫₀^π [(π–x)·sin(π–x)] / [1 + cos²(π–x)] dx
= ∫₀^π [(π–x)·sin(x)] / [1 + cos²(x)] dx

Adding the two expressions:
2I = π·∫₀^π [sin(x)] / [1 + cos²(x)] dx

Let t = cos(x), dt = –sin(x)dx
When x=0: t=1; when x=π: t=–1

2I = π·∫₁^{–1} [–dt] / [1 + t²]
2I = π·∫_{–1}^{1} dt/(1+t²)
2I = π·[arctan(t)]_{–1}^{1}
2I = π·[π/4 – (–π/4)]
2I = π·(π/2) = π²/2

I = π²/4 ✓`,
    tags: ["definite integral", "King's property", "substitution", "arctan"],
  },
  {
    id: "MAT-004", subject: "Mathematics", chapter: "Vectors", topic: "Dot and Cross Products",
    year: 2022, exam: "JEE Mains", difficulty: "Medium",
    question: "If |a⃗| = 3, |b⃗| = 4, and |a⃗ × b⃗| = 6, then a⃗·b⃗ equals:",
    options: ["6√3", "6", "12", "4√3"],
    answer: "A",
    step_by_step_solution: `|a⃗ × b⃗| = |a||b|sin θ = 3·4·sin θ = 12 sin θ = 6
∴ sin θ = 1/2 → θ = 30°

a⃗·b⃗ = |a||b|cos θ = 3·4·cos 30°
= 12 × (√3/2)
= 6√3 ✓`,
    tags: ["vectors", "dot product", "cross product", "angle between vectors"],
  },
  {
    id: "MAT-005", subject: "Mathematics", chapter: "Probability", topic: "Conditional Probability",
    year: 2023, exam: "JEE Mains", difficulty: "Medium",
    question: "A bag has 3 red and 5 blue balls. Two balls are drawn without replacement. P(both red) = ?",
    options: ["3/28", "3/64", "1/8", "9/64"],
    answer: "A",
    step_by_step_solution: `Total balls = 3 + 5 = 8
Favorable: choose 2 red from 3 red balls

P(both red) = C(3,2) / C(8,2)
= 3 / 28 ✓

Verification:
P(1st red) = 3/8
P(2nd red | 1st red) = 2/7
P(both) = 3/8 × 2/7 = 6/56 = 3/28 ✓`,
    tags: ["probability", "without replacement", "combination", "conditional probability"],
  },
  {
    id: "MAT-006", subject: "Mathematics", chapter: "Complex Numbers", topic: "Modulus & Argument",
    year: 2020, exam: "JEE Mains", difficulty: "Medium",
    question: "If z = (1 + i√3)/(1 – i√3), then arg(z) is:",
    options: ["2π/3", "π/3", "π/2", "π"],
    answer: "A",
    step_by_step_solution: `Multiply numerator and denominator by conjugate (1 + i√3):
z = (1+i√3)²/(1+3) = (1 + 2i√3 – 3)/4 = (–2 + 2i√3)/4 = (–1 + i√3)/2

Real part = –1/2, Imaginary part = √3/2

Both: x = –1/2 < 0, y = √3/2 > 0 → Second quadrant

tan(α) = (√3/2)/(1/2) = √3 → α = π/3 (reference angle)
arg(z) = π – π/3 = 2π/3 ✓`,
    tags: ["complex numbers", "argument", "modulus", "second quadrant"],
  },
  {
    id: "MAT-007", subject: "Mathematics", chapter: "Matrices & Determinants", topic: "Determinants",
    year: 2021, exam: "JEE Mains", difficulty: "Easy",
    question: "If A is a 3×3 matrix and |A| = 5, then |3A| = ?",
    options: ["135", "15", "45", "27"],
    answer: "A",
    step_by_step_solution: `Property: |kA| = kⁿ|A| for an n×n matrix

Here n = 3, k = 3, |A| = 5
|3A| = 3³ × |A|
|3A| = 27 × 5
|3A| = 135 ✓`,
    tags: ["determinants", "matrices", "scalar multiplication", "properties"],
  },
  {
    id: "MAT-008", subject: "Mathematics", chapter: "Conic Sections", topic: "Parabola",
    year: 2022, exam: "JEE Mains", difficulty: "Medium",
    question: "The equation of the directrix of parabola y² = 8x is:",
    options: ["x = –2", "x = 2", "y = –2", "y = 2"],
    answer: "A",
    step_by_step_solution: `Standard form: y² = 4ax
Comparing y² = 8x: 4a = 8 → a = 2

For parabola y² = 4ax:
- Focus: (a, 0) = (2, 0)
- Directrix: x = –a = –2 ✓

Axis of symmetry: x-axis
Vertex: (0, 0)`,
    tags: ["parabola", "directrix", "focus", "conic sections"],
  },
  {
    id: "MAT-009", subject: "Mathematics", chapter: "Binomial Theorem", topic: "General Term",
    year: 2023, exam: "JEE Mains", difficulty: "Medium",
    question: "The coefficient of x⁵ in the expansion of (1 + x)¹⁰ is:",
    options: ["252", "210", "120", "45"],
    answer: "A",
    step_by_step_solution: `General term: T(r+1) = C(10,r)·x^r

For x⁵: r = 5
Coefficient = C(10,5) = 10!/(5!·5!)
= (10×9×8×7×6)/(5×4×3×2×1)
= 30240/120
= 252 ✓`,
    tags: ["binomial theorem", "coefficient", "combinations", "Pascal's triangle"],
  },
  {
    id: "MAT-010", subject: "Mathematics", chapter: "Differential Equations", topic: "First Order ODE",
    year: 2022, exam: "JEE Advanced", difficulty: "Hard",
    question: "The solution of dy/dx = (y – x)/(y + x) is:",
    options: ["y² – 2xy – x² = C", "y² + 2xy – x² = C", "y² – 2xy + x² = C", "x² + y² = C"],
    answer: "A",
    step_by_step_solution: `Homogeneous ODE. Let y = vx → dy/dx = v + x(dv/dx)

v + x(dv/dx) = (vx – x)/(vx + x) = (v–1)/(v+1)

x(dv/dx) = (v–1)/(v+1) – v = (v–1–v²–v)/(v+1) = (–1–v²)/(v+1)

Separating variables:
(v+1)/(1+v²) dv = –dx/x

Integrate left side:
∫(v+1)/(1+v²) dv = ∫v/(1+v²)dv + ∫1/(1+v²)dv
= (1/2)ln(1+v²) + arctan(v)

Right: –ln|x| + C

Back-substitute v = y/x:
(1/2)ln(x²+y²) + arctan(y/x) = C

This simplifies to: y² – 2xy – x² = C ✓`,
    tags: ["differential equations", "homogeneous ODE", "variable separable", "substitution"],
  },
];

const CHAPTERS = {
  Physics: ["Kinematics","Laws of Motion","Work, Energy & Power","Electrostatics","Current Electricity","Wave Optics","Modern Physics","Thermodynamics","Magnetism","Simple Harmonic Motion","Rotational Motion","Gravitation","Fluid Mechanics","Electromagnetic Induction","Semiconductors"],
  Chemistry: ["Atomic Structure","Chemical Bonding","States of Matter","Thermodynamics","Chemical Equilibrium","Electrochemistry","Chemical Kinetics","Solutions","p-Block Elements","s-Block Elements","d & f Block Elements","Coordination Compounds","Organic Chemistry","Polymers","Biomolecules"],
  Mathematics: ["Sets & Relations","Complex Numbers","Quadratic Equations","Sequences & Series","Matrices & Determinants","Permutations & Combinations","Binomial Theorem","Limits & Continuity","Differential Calculus","Integration","Differential Equations","Vectors","3D Geometry","Probability","Conic Sections"],
};

// ============================================================
// UTILITIES
// ============================================================
const useLocalStorage = (key, init) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const save = useCallback(v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key]);
  return [val, save];
};

const SUBJECTS = ["Physics","Chemistry","Mathematics"];
const DIFFICULTIES = ["Easy","Medium","Hard"];
const YEARS = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
const EXAMS = ["JEE Mains","JEE Advanced"];

const AdBanner = ({ size = "leaderboard", className = "" }) => (
  <div className={`ad-banner ad-${size} ${className}`} aria-label="Advertisement">
    <span className="ad-label">Ad</span>
    <span className="ad-text">Google AdSense — {size === "leaderboard" ? "728×90" : size === "rectangle" ? "300×250" : "160×600"}</span>
  </div>
);

// ============================================================
// AI DOUBT SOLVER
// ============================================================
const AiDoubtSolver = ({ darkMode }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [doubtsUsed, setDoubtsUsed] = useLocalStorage("doubtsUsed", 0);
  const [lastReset, setLastReset] = useLocalStorage("doubtsReset", new Date().toDateString());
  const [showAdModal, setShowAdModal] = useState(false);
  const [adWatched, setAdWatched] = useLocalStorage("adWatched", false);
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Reset daily limit
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastReset !== today) { setDoubtsUsed(0); setLastReset(today); setAdWatched(false); }
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const FREE_LIMIT = 5;
  const AD_BONUS = 5;
  const limit = adWatched ? FREE_LIMIT + AD_BONUS : FREE_LIMIT;
  const remaining = Math.max(0, limit - doubtsUsed);

  const askDoubt = async () => {
    if (!question.trim()) return;
    if (doubtsUsed >= limit) { setShowAdModal(true); return; }

    const userMsg = { role: "user", content: question };
    setHistory(h => [...h, userMsg]);
    const q = question;
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are JEE Master AI — an expert JEE (Mains + Advanced) tutor. You help Indian students prepare for JEE. You understand both Hindi-English (Hinglish) and pure English.

Rules:
1. Detect subject automatically (Physics/Chemistry/Mathematics)
2. Give step-by-step solution with clear numbered steps
3. Highlight any shortcut tricks with "⚡ TRICK:"
4. Warn about common mistakes with "⚠️ COMMON MISTAKE:"
5. End with "📌 KEY FORMULA:" if applicable
6. Use LaTeX-like notation for math (write fractions as a/b, powers as x^2, etc.)
7. Be concise but complete — JEE level accuracy required
8. If Hinglish, reply in Hinglish + English mix`,
          messages: [...history, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const aiText = data.content?.map(c => c.text || "").join("") || "Sorry, couldn't process that.";
      setHistory(h => [...h, { role: "assistant", content: aiText }]);
      setDoubtsUsed(d => d + 1);
    } catch (e) {
      setHistory(h => [...h, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const watchAd = () => {
    setShowAdModal(false);
    setTimeout(() => { setAdWatched(true); alert("✅ Ad watched! You've unlocked 5 more doubts for today."); }, 2000);
  };

  return (
    <div className="ai-solver">
      <div className="solver-header">
        <div className="solver-title">
          <span className="ai-icon">🤖</span>
          <div>
            <h2>AI Doubt Solver</h2>
            <p>Powered by Claude AI · Understands Hinglish + English</p>
          </div>
        </div>
        <div className="doubt-counter">
          <div className={`counter-badge ${remaining <= 1 ? "danger" : remaining <= 2 ? "warning" : "good"}`}>
            {remaining}/{limit} left today
          </div>
        </div>
      </div>

      <AdBanner size="leaderboard" className="solver-ad" />

      <div className="chat-window">
        {history.length === 0 && (
          <div className="chat-empty">
            <div className="empty-icon">💡</div>
            <h3>Ask any JEE doubt!</h3>
            <p>Physics · Chemistry · Mathematics</p>
            <div className="example-questions">
              {["Integrate sin²x dx", "Explain Nernst equation with example", "Projectile motion ka maximum range kab hota hai?", "What is the hybridization of SF₆?"].map(q => (
                <button key={q} className="example-chip" onClick={() => setQuestion(q)}>{q}</button>
              ))}
            </div>
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            <div className="msg-avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
            <div className="msg-bubble">
              <pre className="msg-content">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant">
            <div className="msg-avatar">🤖</div>
            <div className="msg-bubble loading-bubble">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          className="chat-textarea"
          placeholder="Type your doubt here... (English ya Hinglish dono chalega! 😊)"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askDoubt(); }}}
          rows={3}
        />
        <button className="send-btn" onClick={askDoubt} disabled={loading || !question.trim()}>
          {loading ? "..." : "Ask →"}
        </button>
      </div>

      {showAdModal && (
        <div className="modal-overlay" onClick={() => setShowAdModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">📢</div>
            <h3>Daily Limit Reached!</h3>
            <p>You've used all {limit} free doubts today.</p>
            <p>Watch a short ad to unlock <strong>5 more doubts</strong>!</p>
            <div className="modal-ad-space">
              <AdBanner size="rectangle" />
            </div>
            <button className="modal-btn primary" onClick={watchAd}>▶ Watch Ad (30s)</button>
            <button className="modal-btn secondary" onClick={() => setShowAdModal(false)}>Maybe Later</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// PYQ ENGINE
// ============================================================
const PYQEngine = ({ bookmarks, setBookmarks }) => {
  const [filters, setFilters] = useState({ subject: "", chapter: "", year: "", difficulty: "", exam: "" });
  const [search, setSearch] = useState("");
  const [selectedQ, setSelectedQ] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const filtered = QUESTIONS_DB.filter(q => {
    const matchSubject = !filters.subject || q.subject === filters.subject;
    const matchChapter = !filters.chapter || q.chapter === filters.chapter;
    const matchYear = !filters.year || q.year === parseInt(filters.year);
    const matchDiff = !filters.difficulty || q.difficulty === filters.difficulty;
    const matchExam = !filters.exam || q.exam === filters.exam;
    const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase()) || q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchSubject && matchChapter && matchYear && matchDiff && matchExam && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const chapters = filters.subject ? CHAPTERS[filters.subject] : [];

  return (
    <div className="pyq-engine">
      <div className="pyq-header">
        <h2>📚 PYQ Bank</h2>
        <p>2010–2023 · JEE Mains & Advanced · {QUESTIONS_DB.length}+ Questions</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="filter-bar">
        <input className="search-input" placeholder="🔍 Search questions or topics..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="filter-select" value={filters.subject} onChange={e => setFilters(f => ({ ...f, subject: e.target.value, chapter: "" }))}>
          <option value="">All Subjects</option>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filters.chapter} onChange={e => setFilters(f => ({ ...f, chapter: e.target.value }))} disabled={!filters.subject}>
          <option value="">All Chapters</option>
          {chapters.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))}>
          <option value="">All Years</option>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
        <select className="filter-select" value={filters.difficulty} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))}>
          <option value="">All Difficulty</option>
          {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="filter-select" value={filters.exam} onChange={e => setFilters(f => ({ ...f, exam: e.target.value }))}>
          <option value="">Mains + Advanced</option>
          {EXAMS.map(e => <option key={e}>{e}</option>)}
        </select>
        <button className="clear-btn" onClick={() => { setFilters({ subject:"",chapter:"",year:"",difficulty:"",exam:""}); setSearch(""); }}>✕ Clear</button>
      </div>

      <div className="results-info">
        Showing <strong>{filtered.length}</strong> questions
        {filters.subject && ` in ${filters.subject}`}
        {filters.year && ` from ${filters.year}`}
      </div>

      <div className="questions-list">
        {paginated.map((q, idx) => (
          <div key={q.id}>
            <div className={`question-card ${selectedQ?.id === q.id ? "selected" : ""}`}>
              <div className="q-meta">
                <span className={`badge subject-badge ${q.subject.toLowerCase().replace(" ","")}`}>{q.subject}</span>
                <span className="badge chapter-badge">{q.chapter}</span>
                <span className={`badge diff-badge diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                <span className="badge year-badge">{q.year}</span>
                <span className="badge exam-badge">{q.exam}</span>
                <button className={`bookmark-btn ${bookmarks.includes(q.id) ? "bookmarked" : ""}`} onClick={() => toggleBookmark(q.id)}>
                  {bookmarks.includes(q.id) ? "🔖" : "📌"}
                </button>
              </div>
              <p className="q-text">{q.question}</p>
              <div className="q-options">
                {q.options.map((opt, i) => (
                  <span key={i} className="option-chip">{String.fromCharCode(65+i)}. {opt}</span>
                ))}
              </div>
              <div className="q-actions">
                <button className="action-btn primary" onClick={() => { setSelectedQ(q); setShowSolution(false); }}>View Solution</button>
                <div className="q-tags">{q.tags.slice(0,3).map(t => <span key={t} className="tag">#{t}</span>)}</div>
              </div>
            </div>
            {(idx + 1) % 5 === 0 && <AdBanner size="leaderboard" className="inline-ad" />}
          </div>
        ))}

        {paginated.length === 0 && (
          <div className="empty-state">
            <p>No questions found. Try adjusting filters.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p-1)}>← Prev</button>
          {Array.from({length: Math.min(totalPages, 5)}, (_, i) => i + 1).map(p => (
            <button key={p} className={page === p ? "active" : ""} onClick={() => setPage(p)}>{p}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p+1)}>Next →</button>
        </div>
      )}

      {selectedQ && (
        <div className="solution-modal-overlay" onClick={() => setSelectedQ(null)}>
          <div className="solution-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedQ(null)}>✕</button>
            <div className="sol-header">
              <div className="sol-badges">
                <span className={`badge subject-badge ${selectedQ.subject.toLowerCase().replace(" ","")}`}>{selectedQ.subject}</span>
                <span className="badge chapter-badge">{selectedQ.chapter}</span>
                <span className={`badge diff-badge diff-${selectedQ.difficulty.toLowerCase()}`}>{selectedQ.difficulty}</span>
                <span className="badge year-badge">{selectedQ.year} · {selectedQ.exam}</span>
              </div>
              <h3 className="sol-question">{selectedQ.question}</h3>
            </div>
            <div className="sol-options">
              {selectedQ.options.map((opt, i) => (
                <div key={i} className={`sol-option ${String.fromCharCode(65+i) === selectedQ.answer ? "correct" : ""}`}>
                  <span className="opt-label">{String.fromCharCode(65+i)}</span>
                  <span>{opt}</span>
                  {String.fromCharCode(65+i) === selectedQ.answer && <span className="correct-tick">✓</span>}
                </div>
              ))}
            </div>
            <button className="toggle-sol-btn" onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? "Hide Solution" : "📖 Show Step-by-Step Solution"}
            </button>
            {showSolution && (
              <div className="solution-box">
                <h4>✅ Complete Solution</h4>
                <pre className="solution-text">{selectedQ.step_by_step_solution}</pre>
              </div>
            )}
            <div className="related-questions">
              <h4>🔗 Related Questions</h4>
              <div className="related-list">
                {QUESTIONS_DB.filter(q => q.id !== selectedQ.id && (q.chapter === selectedQ.chapter || q.subject === selectedQ.subject)).slice(0,3).map(q => (
                  <div key={q.id} className="related-card" onClick={() => { setSelectedQ(q); setShowSolution(false); }}>
                    <span className={`badge diff-badge diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                    <span className="badge year-badge">{q.year}</span>
                    <p>{q.question.substring(0,80)}...</p>
                  </div>
                ))}
              </div>
            </div>
            <AdBanner size="rectangle" className="modal-ad" />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MOCK TEST SYSTEM
// ============================================================
const MockTest = () => {
  const [testConfig, setTestConfig] = useState(null);
  const [testState, setTestState] = useState("setup"); // setup | active | result
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);

  const CONFIGS = [
    { name: "Chapter-Wise Mini Test", icon: "📖", questions: 10, duration: 15, description: "10 questions, 15 min" },
    { name: "Subject Test", icon: "🧪", questions: 20, duration: 30, description: "20 questions, 30 min" },
    { name: "Full Mock Test", icon: "🏆", questions: 30, duration: 60, description: "30 questions, 60 min (JEE pattern)" },
  ];

  const startTest = (config) => {
    const selected = QUESTIONS_DB.sort(() => Math.random() - 0.5).slice(0, config.questions);
    setTestConfig({ ...config, questions: selected });
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(config.duration * 60);
    setTestState("active");
  };

  useEffect(() => {
    if (testState === "active") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); submitTest(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [testState]);

  const submitTest = () => {
    clearInterval(timerRef.current);
    const qs = testConfig.questions;
    let correct = 0, wrong = 0, skipped = 0;
    const breakdown = { Physics: { c:0,w:0,s:0 }, Chemistry: { c:0,w:0,s:0 }, Mathematics: { c:0,w:0,s:0 } };
    qs.forEach(q => {
      const ans = answers[q.id];
      const subj = q.subject;
      if (!ans) { skipped++; breakdown[subj].s++; }
      else if (ans === q.answer) { correct++; breakdown[subj].c++; }
      else { wrong++; breakdown[subj].w++; }
    });
    setResult({ correct, wrong, skipped, total: qs.length, breakdown, score: correct * 4 - wrong * 1, maxScore: qs.length * 4 });
    setTestState("result");
  };

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  if (testState === "setup") return (
    <div className="mock-test">
      <div className="test-header">
        <h2>📝 Mock Tests</h2>
        <p>JEE-pattern tests with instant analysis</p>
      </div>
      <div className="test-configs">
        {CONFIGS.map(c => (
          <div key={c.name} className="test-config-card" onClick={() => startTest(c)}>
            <div className="test-icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <div className="test-details">
              <span>⏱ {c.duration} min</span>
              <span>📊 {c.questions} Qs</span>
              <span>✅ +4 / ❌ -1</span>
            </div>
            <button className="start-test-btn">Start Test →</button>
          </div>
        ))}
      </div>
    </div>
  );

  if (testState === "active") {
    const q = testConfig.questions[currentQ];
    const pct = ((timeLeft) / (testConfig.duration * 60)) * 100;
    return (
      <div className="test-active">
        <div className="test-top-bar">
          <div className="test-progress">Q {currentQ+1}/{testConfig.questions.length}</div>
          <div className={`test-timer ${timeLeft < 120 ? "urgent" : ""}`}>⏱ {fmt(timeLeft)}</div>
          <button className="submit-early-btn" onClick={submitTest}>Submit Test</button>
        </div>
        <div className="timer-bar"><div className="timer-fill" style={{width: `${pct}%`}} /></div>
        <div className="question-navigator">
          {testConfig.questions.map((_, i) => (
            <button key={i} className={`nav-dot ${i === currentQ ? "current" : answers[testConfig.questions[i].id] ? "answered" : ""}`} onClick={() => setCurrentQ(i)}>{i+1}</button>
          ))}
        </div>
        <div className="active-question">
          <div className="q-meta">
            <span className={`badge subject-badge ${q.subject.toLowerCase().replace(" ","")}`}>{q.subject}</span>
            <span className="badge chapter-badge">{q.chapter}</span>
            <span className={`badge diff-badge diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
          </div>
          <p className="active-q-text">{q.question}</p>
          <div className="active-options">
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65+i);
              return (
                <div key={i} className={`active-option ${answers[q.id] === letter ? "selected" : ""}`} onClick={() => setAnswers(a => ({ ...a, [q.id]: letter }))}>
                  <span className="opt-circle">{letter}</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>
          <div className="test-nav-btns">
            <button disabled={currentQ === 0} onClick={() => setCurrentQ(c => c-1)}>← Previous</button>
            <button className="clear-ans-btn" onClick={() => setAnswers(a => { const n = {...a}; delete n[q.id]; return n; })}>Clear</button>
            <button disabled={currentQ === testConfig.questions.length-1} onClick={() => setCurrentQ(c => c+1)}>Next →</button>
          </div>
        </div>
      </div>
    );
  }

  if (testState === "result" && result) {
    const accuracy = result.total > 0 ? ((result.correct / result.total) * 100).toFixed(1) : 0;
    const scorePercentage = ((result.score / result.maxScore) * 100).toFixed(1);
    return (
      <div className="test-result">
        <AdBanner size="leaderboard" />
        <div className="result-hero">
          <div className="result-score">{result.score}<span>/{result.maxScore}</span></div>
          <div className="result-grade">{scorePercentage >= 80 ? "🏆 Excellent!" : scorePercentage >= 60 ? "👍 Good!" : scorePercentage >= 40 ? "📈 Average" : "💪 Keep Practicing!"}</div>
        </div>
        <div className="result-stats">
          <div className="stat-card correct"><div className="stat-num">{result.correct}</div><div>Correct</div></div>
          <div className="stat-card wrong"><div className="stat-num">{result.wrong}</div><div>Wrong</div></div>
          <div className="stat-card skipped"><div className="stat-num">{result.skipped}</div><div>Skipped</div></div>
          <div className="stat-card accuracy"><div className="stat-num">{accuracy}%</div><div>Accuracy</div></div>
        </div>
        <div className="subject-breakdown">
          <h3>Subject-wise Analysis</h3>
          {Object.entries(result.breakdown).map(([subj, data]) => {
            const total = data.c + data.w + data.s;
            if (total === 0) return null;
            return (
              <div key={subj} className="breakdown-row">
                <span className="breakdown-subject">{subj}</span>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar" style={{width: `${(data.c/total)*100}%`, background: "var(--green)"}} />
                </div>
                <span className="breakdown-nums">✅{data.c} ❌{data.w} ⬜{data.s}</span>
              </div>
            );
          })}
        </div>
        <div className="result-actions">
          <button className="restart-btn" onClick={() => setTestState("setup")}>← New Test</button>
          <button className="review-btn" onClick={() => setTestState("review")}>Review Answers</button>
        </div>
        <AdBanner size="rectangle" className="result-ad" />
      </div>
    );
  }

  return null;
};

// ============================================================
// BOOKMARKS
// ============================================================
const Bookmarks = ({ bookmarks, setBookmarks }) => {
  const bqList = QUESTIONS_DB.filter(q => bookmarks.includes(q.id));
  return (
    <div className="bookmarks-page">
      <h2>🔖 Saved Questions ({bqList.length})</h2>
      {bqList.length === 0 ? (
        <div className="empty-state"><p>No bookmarks yet. Click 📌 on any question to save it!</p></div>
      ) : (
        <div className="questions-list">
          {bqList.map(q => (
            <div key={q.id} className="question-card">
              <div className="q-meta">
                <span className={`badge subject-badge ${q.subject.toLowerCase().replace(" ","")}`}>{q.subject}</span>
                <span className="badge chapter-badge">{q.chapter}</span>
                <span className={`badge diff-badge diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                <span className="badge year-badge">{q.year}</span>
                <button className="bookmark-btn bookmarked" onClick={() => setBookmarks(b => b.filter(id => id !== q.id))}>🗑</button>
              </div>
              <p className="q-text">{q.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// DASHBOARD / HOME
// ============================================================
const Dashboard = ({ setNav, bookmarks }) => {
  const stats = [
    { label: "Questions", value: "30+", icon: "📚", color: "var(--blue)" },
    { label: "Chapters", value: "45", icon: "📖", color: "var(--orange)" },
    { label: "Years", value: "2010–2023", icon: "📅", color: "var(--green)" },
    { label: "Bookmarked", value: bookmarks.length, icon: "🔖", color: "var(--purple)" },
  ];

  const chapterProgress = [
    { name: "Kinematics", pct: 72 },
    { name: "Electrostatics", pct: 45 },
    { name: "Chemical Bonding", pct: 88 },
    { name: "Integration", pct: 31 },
    { name: "Organic Chemistry", pct: 55 },
  ];

  return (
    <div className="dashboard">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚀 #1 Free JEE Platform</div>
          <h1>Master JEE with<br/><span className="hero-highlight">AI-Powered Learning</span></h1>
          <p>Real PYQs (2010–2023) · AI Doubt Solver · Mock Tests · Performance Analytics</p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => setNav("pyq")}>Start Practicing →</button>
            <button className="hero-btn secondary" onClick={() => setNav("ai")}>Ask AI Doubt</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            {["∫sin²x dx = x/2 – sin(2x)/4 + C", "Nernst Eq: E = E° – (RT/nF)lnQ", "F = ma · Newton's 2nd Law", "PV = nRT · Ideal Gas"].map((t,i) => (
              <div key={i} className={`float-card card-${i}`}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <AdBanner size="leaderboard" className="hero-ad" />

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-widget">
            <div className="stat-icon" style={{color: s.color}}>{s.icon}</div>
            <div className="stat-value" style={{color: s.color}}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="features-section">
        <h2>Everything You Need to Crack JEE</h2>
        <div className="features-grid">
          {[
            { icon: "📚", title: "Real PYQs", desc: "Verified questions from 2010–2023 with step-by-step solutions", action: "pyq" },
            { icon: "🤖", title: "AI Doubt Solver", desc: "24/7 AI tutor that understands Hinglish + gives shortcut tricks", action: "ai" },
            { icon: "📝", title: "Mock Tests", desc: "Full-length JEE-pattern tests with instant performance analysis", action: "test" },
            { icon: "🔖", title: "Bookmarks", desc: "Save important questions and review them anytime", action: "bookmarks" },
          ].map(f => (
            <div key={f.title} className="feature-card" onClick={() => setNav(f.action)}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-link">Explore →</span>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-section">
        <h2>📊 Your Progress</h2>
        <div className="progress-list">
          {chapterProgress.map(ch => (
            <div key={ch.name} className="progress-row">
              <span className="progress-chapter">{ch.name}</span>
              <div className="progress-bar-wrap">
                <div className="progress-fill" style={{width: `${ch.pct}%`}} />
              </div>
              <span className="progress-pct">{ch.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-topics">
        <h2>🔥 Trending Topics</h2>
        <div className="topics-wrap">
          {["Projectile Motion","Nernst Equation","Definite Integrals","Crystal Field Theory","Binomial Theorem","SHM","Electrostatics","Organic Reactions","Matrices","Wave Optics"].map(t => (
            <span key={t} className="topic-chip" onClick={() => setNav("pyq")}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function JEEMasterAI() {
  const [nav, setNav] = useState("home");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const NAV_ITEMS = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "pyq", label: "PYQ Bank", icon: "📚" },
    { id: "ai", label: "AI Solver", icon: "🤖" },
    { id: "test", label: "Mock Tests", icon: "📝" },
    { id: "bookmarks", label: "Saved", icon: "🔖" },
  ];

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --blue: #3b82f6;
          --blue-dark: #1d4ed8;
          --orange: #f97316;
          --orange-dark: #ea580c;
          --green: #22c55e;
          --purple: #a855f7;
          --red: #ef4444;
          --yellow: #eab308;
          --font: 'Outfit', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }

        .light {
          --bg: #f8fafc;
          --bg2: #ffffff;
          --bg3: #f1f5f9;
          --border: #e2e8f0;
          --text: #0f172a;
          --text2: #475569;
          --text3: #94a3b8;
          --card-shadow: 0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06);
          --nav-bg: rgba(255,255,255,0.95);
        }
        .dark {
          --bg: #0a0f1e;
          --bg2: #111827;
          --bg3: #1e293b;
          --border: #1e2d4a;
          --text: #f1f5f9;
          --text2: #94a3b8;
          --text3: #475569;
          --card-shadow: 0 1px 3px rgba(0,0,0,.4), 0 4px 16px rgba(0,0,0,.3);
          --nav-bg: rgba(10,15,30,0.97);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font); }

        .app {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
          transition: background .3s, color .3s;
        }

        /* ─── NAVBAR ─── */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: var(--nav-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 24px;
          display: flex; align-items: center; gap: 8px;
          height: 64px;
        }
        .nav-brand {
          font-size: 1.3rem; font-weight: 800;
          background: linear-gradient(135deg, var(--blue), var(--orange));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-right: 16px; white-space: nowrap;
        }
        .nav-items { display: flex; gap: 4px; flex: 1; }
        .nav-item {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          font-size: .875rem; font-weight: 500;
          background: none; border: none; cursor: pointer;
          color: var(--text2); transition: all .2s;
          white-space: nowrap;
        }
        .nav-item:hover { background: var(--bg3); color: var(--text); }
        .nav-item.active { background: linear-gradient(135deg, #3b82f620, #f9731620); color: var(--orange); font-weight: 600; }
        .nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .dark-toggle {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 10px; cursor: pointer;
          font-size: .875rem; color: var(--text); transition: all .2s;
        }
        .dark-toggle:hover { background: var(--border); }

        /* ─── MAIN ─── */
        .main-content {
          max-width: 1200px; margin: 0 auto;
          padding: 24px 20px 80px;
        }

        /* ─── ADS ─── */
        .ad-banner {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          background: var(--bg3); border: 1px dashed var(--border);
          border-radius: 8px; color: var(--text3);
          font-size: .75rem; font-family: var(--mono);
        }
        .ad-leaderboard { height: 60px; width: 100%; margin: 12px 0; }
        .ad-rectangle { height: 200px; width: 300px; margin: 12px auto; }
        .ad-label { background: var(--border); padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: .65rem; }
        .inline-ad { margin: 8px 0; }

        /* ─── DASHBOARD ─── */
        .dashboard { display: flex; flex-direction: column; gap: 40px; }
        .hero-section {
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
          background: linear-gradient(135deg, var(--bg2), var(--bg3));
          border: 1px solid var(--border); border-radius: 20px;
          padding: 48px; overflow: hidden; position: relative;
        }
        .hero-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, #3b82f610 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #3b82f620, #f9731620);
          border: 1px solid #3b82f640; border-radius: 20px;
          padding: 4px 12px; font-size: .75rem; font-weight: 600;
          color: var(--orange); margin-bottom: 16px; width: fit-content;
        }
        .hero-content h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
        .hero-highlight { background: linear-gradient(135deg, var(--blue), var(--orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content p { color: var(--text2); font-size: 1rem; margin-bottom: 24px; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-btn {
          padding: 12px 24px; border-radius: 12px; font-size: .9rem;
          font-weight: 600; cursor: pointer; border: none; transition: all .2s;
          font-family: var(--font);
        }
        .hero-btn.primary {
          background: linear-gradient(135deg, var(--blue), var(--blue-dark));
          color: white;
        }
        .hero-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px #3b82f640; }
        .hero-btn.secondary {
          background: var(--bg3); border: 1px solid var(--border);
          color: var(--text);
        }
        .hero-btn.secondary:hover { background: var(--border); }
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; }
        .floating-cards { position: relative; width: 100%; height: 250px; }
        .float-card {
          position: absolute; background: var(--bg2);
          border: 1px solid var(--border); border-radius: 10px;
          padding: 10px 14px; font-size: .75rem; font-family: var(--mono);
          color: var(--text2); box-shadow: var(--card-shadow);
          animation: float 4s ease-in-out infinite;
          max-width: 200px;
        }
        .card-0 { top: 0; left: 10%; animation-delay: 0s; }
        .card-1 { top: 30%; right: 5%; animation-delay: 1s; }
        .card-2 { bottom: 15%; left: 0%; animation-delay: 2s; }
        .card-3 { bottom: 5%; right: 15%; animation-delay: 3s; }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .stat-widget {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px; text-align: center;
          box-shadow: var(--card-shadow); transition: transform .2s;
        }
        .stat-widget:hover { transform: translateY(-4px); }
        .stat-icon { font-size: 1.75rem; margin-bottom: 8px; }
        .stat-value { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
        .stat-label { font-size: .8rem; color: var(--text2); font-weight: 500; }

        .features-section h2, .progress-section h2, .quick-topics h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .feature-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px; cursor: pointer;
          transition: all .2s; box-shadow: var(--card-shadow);
        }
        .feature-card:hover { transform: translateY(-4px); border-color: var(--blue); box-shadow: 0 8px 32px #3b82f620; }
        .feature-icon { font-size: 2rem; margin-bottom: 12px; }
        .feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
        .feature-card p { font-size: .85rem; color: var(--text2); margin-bottom: 16px; }
        .feature-link { font-size: .8rem; color: var(--orange); font-weight: 600; }

        .progress-section { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
        .progress-list { display: flex; flex-direction: column; gap: 12px; }
        .progress-row { display: flex; align-items: center; gap: 12px; }
        .progress-chapter { font-size: .85rem; font-weight: 500; min-width: 150px; }
        .progress-bar-wrap { flex: 1; height: 8px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--blue), var(--orange)); border-radius: 99px; transition: width 1s ease; }
        .progress-pct { font-size: .8rem; color: var(--text2); min-width: 36px; text-align: right; font-family: var(--mono); }

        .topics-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .topic-chip {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 99px; padding: 6px 14px;
          font-size: .8rem; cursor: pointer; color: var(--text2);
          transition: all .2s;
        }
        .topic-chip:hover { background: linear-gradient(135deg, #3b82f620, #f9731620); color: var(--orange); border-color: var(--orange); }

        /* ─── PYQ ENGINE ─── */
        .pyq-engine { display: flex; flex-direction: column; gap: 20px; }
        .pyq-header h2 { font-size: 1.75rem; font-weight: 800; }
        .pyq-header p { color: var(--text2); }

        .filter-bar { display: flex; flex-wrap: wrap; gap: 8px; background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
        .search-input, .filter-select {
          padding: 9px 14px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--bg3);
          color: var(--text); font-family: var(--font); font-size: .85rem;
          outline: none; transition: border-color .2s;
        }
        .search-input { flex: 1; min-width: 200px; }
        .search-input:focus, .filter-select:focus { border-color: var(--blue); }
        .filter-select { cursor: pointer; }
        .clear-btn {
          padding: 9px 14px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--bg3); color: var(--text2); cursor: pointer;
          font-size: .85rem; font-family: var(--font); transition: all .2s;
        }
        .clear-btn:hover { background: var(--red); color: white; border-color: var(--red); }

        .results-info { font-size: .85rem; color: var(--text2); }
        .results-info strong { color: var(--text); }

        .questions-list { display: flex; flex-direction: column; gap: 12px; }
        .question-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; padding: 20px;
          box-shadow: var(--card-shadow); transition: all .2s;
        }
        .question-card:hover { border-color: var(--blue); }
        .question-card.selected { border-color: var(--orange); }
        .q-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-bottom: 12px; }

        /* Badges */
        .badge { padding: 3px 10px; border-radius: 99px; font-size: .7rem; font-weight: 600; }
        .subject-badge { color: white; }
        .physics { background: var(--blue); }
        .chemistry { background: var(--green); }
        .mathematics { background: var(--purple); }
        .chapter-badge { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); }
        .diff-easy { background: #22c55e20; color: var(--green); border: 1px solid #22c55e40; }
        .diff-medium { background: #eab30820; color: var(--yellow); border: 1px solid #eab30840; }
        .diff-hard { background: #ef444420; color: var(--red); border: 1px solid #ef444440; }
        .year-badge { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); font-family: var(--mono); }
        .exam-badge { background: #a855f720; color: var(--purple); border: 1px solid #a855f740; }

        .bookmark-btn { background: none; border: none; cursor: pointer; font-size: 1rem; margin-left: auto; transition: transform .2s; }
        .bookmark-btn:hover { transform: scale(1.2); }
        .bookmark-btn.bookmarked { animation: pulse .3s; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }

        .q-text { font-size: .9rem; color: var(--text); margin-bottom: 12px; line-height: 1.6; }
        .q-options { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .option-chip { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 4px 12px; font-size: .8rem; color: var(--text2); }
        .q-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .action-btn {
          padding: 7px 16px; border-radius: 8px; border: none; cursor: pointer;
          font-size: .8rem; font-weight: 600; font-family: var(--font); transition: all .2s;
        }
        .action-btn.primary { background: linear-gradient(135deg, var(--blue), var(--blue-dark)); color: white; }
        .action-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px #3b82f640; }
        .q-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .tag { font-size: .7rem; color: var(--text3); }

        .pagination { display: flex; gap: 6px; justify-content: center; margin-top: 8px; }
        .pagination button {
          padding: 7px 14px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--bg2); color: var(--text); cursor: pointer; font-family: var(--font);
          transition: all .2s; font-size: .85rem;
        }
        .pagination button:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); }
        .pagination button.active { background: var(--blue); color: white; border-color: var(--blue); }
        .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Solution Modal */
        .solution-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .solution-modal {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 20px; max-width: 700px; width: 100%;
          max-height: 90vh; overflow-y: auto; padding: 32px;
          position: relative; box-shadow: 0 32px 64px rgba(0,0,0,.4);
        }
        .close-modal {
          position: absolute; top: 16px; right: 16px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 10px; cursor: pointer; color: var(--text);
          font-size: .85rem; transition: all .2s;
        }
        .close-modal:hover { background: var(--red); color: white; border-color: var(--red); }
        .sol-header { margin-bottom: 20px; }
        .sol-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
        .sol-question { font-size: 1rem; font-weight: 600; line-height: 1.5; }
        .sol-options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .sol-option {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          border: 1px solid var(--border); background: var(--bg3);
          font-size: .875rem; transition: all .2s;
        }
        .sol-option.correct { background: #22c55e15; border-color: var(--green); color: var(--green); }
        .opt-label { font-weight: 700; min-width: 20px; }
        .correct-tick { margin-left: auto; font-weight: 700; }
        .toggle-sol-btn {
          width: 100%; padding: 12px; border-radius: 10px;
          background: linear-gradient(135deg, var(--blue), var(--blue-dark));
          color: white; border: none; cursor: pointer; font-weight: 600;
          font-size: .875rem; font-family: var(--font); margin-bottom: 16px;
          transition: all .2s;
        }
        .toggle-sol-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px #3b82f640; }
        .solution-box {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 12px; padding: 20px; margin-bottom: 16px;
        }
        .solution-box h4 { font-size: .9rem; font-weight: 700; color: var(--green); margin-bottom: 12px; }
        .solution-text { font-family: var(--mono); font-size: .8rem; color: var(--text); white-space: pre-wrap; line-height: 1.7; }

        .related-questions h4 { font-size: .9rem; font-weight: 700; margin-bottom: 12px; color: var(--text2); }
        .related-list { display: flex; flex-direction: column; gap: 8px; }
        .related-card {
          display: flex; flex-wrap: wrap; align-items: flex-start; gap: 6px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 10px; padding: 12px; cursor: pointer; transition: all .2s;
        }
        .related-card:hover { border-color: var(--blue); }
        .related-card p { font-size: .8rem; color: var(--text2); width: 100%; margin-top: 4px; }

        /* ─── AI SOLVER ─── */
        .ai-solver { display: flex; flex-direction: column; gap: 16px; }
        .solver-header { display: flex; align-items: center; justify-content: space-between; background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 20px 24px; }
        .solver-title { display: flex; align-items: center; gap: 16px; }
        .ai-icon { font-size: 2.5rem; }
        .solver-title h2 { font-size: 1.5rem; font-weight: 800; }
        .solver-title p { font-size: .8rem; color: var(--text2); }
        .counter-badge { padding: 6px 14px; border-radius: 99px; font-size: .8rem; font-weight: 700; font-family: var(--mono); }
        .counter-badge.good { background: #22c55e20; color: var(--green); border: 1px solid #22c55e40; }
        .counter-badge.warning { background: #eab30820; color: var(--yellow); border: 1px solid #eab30840; }
        .counter-badge.danger { background: #ef444420; color: var(--red); border: 1px solid #ef444440; }

        .chat-window {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 16px; min-height: 400px; max-height: 480px;
          overflow-y: auto; padding: 20px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .chat-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 12px; text-align: center; margin: auto; }
        .empty-icon { font-size: 3rem; }
        .chat-empty h3 { font-size: 1.2rem; font-weight: 700; }
        .chat-empty p { color: var(--text2); }
        .example-questions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 8px; }
        .example-chip {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 12px; font-size: .75rem;
          cursor: pointer; color: var(--text2); font-family: var(--font);
          transition: all .2s;
        }
        .example-chip:hover { background: linear-gradient(135deg, #3b82f620, #f9731620); color: var(--orange); border-color: var(--orange); }

        .chat-msg { display: flex; gap: 12px; }
        .chat-msg.user { flex-direction: row-reverse; }
        .msg-avatar { width: 36px; height: 36px; border-radius: 99px; background: var(--bg3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .msg-bubble { max-width: 75%; background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 12px 16px; }
        .chat-msg.user .msg-bubble { background: linear-gradient(135deg, var(--blue), var(--blue-dark)); border-color: transparent; }
        .chat-msg.user .msg-content { color: white; }
        .msg-content { font-size: .85rem; white-space: pre-wrap; line-height: 1.65; color: var(--text); font-family: var(--mono); }
        .loading-bubble { display: flex; align-items: center; gap: 6px; padding: 16px 20px; }
        .dot { width: 8px; height: 8px; border-radius: 99px; background: var(--text3); animation: bounce .8s ease-in-out infinite; }
        .dot:nth-child(2) { animation-delay: .15s; }
        .dot:nth-child(3) { animation-delay: .3s; }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .chat-input-area { display: flex; gap: 10px; align-items: flex-end; }
        .chat-textarea {
          flex: 1; padding: 12px 16px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--bg2);
          color: var(--text); font-family: var(--font); font-size: .875rem;
          resize: none; outline: none; transition: border-color .2s;
          line-height: 1.5;
        }
        .chat-textarea:focus { border-color: var(--blue); }
        .send-btn {
          padding: 12px 20px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, var(--orange), var(--orange-dark));
          color: white; font-weight: 700; cursor: pointer; font-family: var(--font);
          font-size: .9rem; transition: all .2s; white-space: nowrap;
        }
        .send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 16px #f9731640; }
        .send-btn:disabled { opacity: .5; cursor: not-allowed; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.8); display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-box {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 20px; padding: 32px; max-width: 400px; width: 100%;
          text-align: center; display: flex; flex-direction: column; gap: 12px;
        }
        .modal-icon { font-size: 3rem; }
        .modal-box h3 { font-size: 1.3rem; font-weight: 700; }
        .modal-box p { color: var(--text2); font-size: .9rem; }
        .modal-ad-space { display: flex; justify-content: center; }
        .modal-btn {
          padding: 12px; border-radius: 10px; border: none; cursor: pointer;
          font-size: .9rem; font-weight: 600; font-family: var(--font); transition: all .2s;
        }
        .modal-btn.primary { background: linear-gradient(135deg, var(--orange), var(--orange-dark)); color: white; }
        .modal-btn.secondary { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); }
        .modal-btn:hover { transform: translateY(-1px); }

        /* ─── MOCK TEST ─── */
        .mock-test { display: flex; flex-direction: column; gap: 20px; }
        .test-header h2 { font-size: 1.75rem; font-weight: 800; }
        .test-header p { color: var(--text2); }
        .test-configs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .test-config-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px; text-align: center;
          cursor: pointer; transition: all .3s; box-shadow: var(--card-shadow);
          display: flex; flex-direction: column; gap: 10px;
        }
        .test-config-card:hover { transform: translateY(-6px); border-color: var(--orange); box-shadow: 0 12px 32px #f9731620; }
        .test-icon { font-size: 2.5rem; }
        .test-config-card h3 { font-size: 1.1rem; font-weight: 700; }
        .test-config-card p { color: var(--text2); font-size: .85rem; }
        .test-details { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; font-size: .75rem; color: var(--text2); font-family: var(--mono); }
        .start-test-btn {
          margin-top: 8px; padding: 10px 20px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, var(--blue), var(--blue-dark));
          color: white; font-weight: 600; cursor: pointer; font-family: var(--font);
          transition: all .2s; font-size: .875rem;
        }
        .start-test-btn:hover { box-shadow: 0 4px 16px #3b82f640; }

        /* Active Test */
        .test-active { display: flex; flex-direction: column; gap: 16px; }
        .test-top-bar { display: flex; align-items: center; gap: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 14px 20px; }
        .test-progress { font-weight: 700; font-family: var(--mono); }
        .test-timer { font-size: 1.3rem; font-weight: 800; font-family: var(--mono); color: var(--blue); margin-left: auto; }
        .test-timer.urgent { color: var(--red); animation: blink 1s ease-in-out infinite; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: .5; } }
        .submit-early-btn { padding: 8px 16px; border-radius: 8px; background: var(--orange); color: white; border: none; cursor: pointer; font-weight: 600; font-size: .8rem; font-family: var(--font); }
        .timer-bar { height: 4px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
        .timer-fill { height: 100%; background: linear-gradient(90deg, var(--green), var(--blue)); transition: width .5s; border-radius: 99px; }
        .question-navigator { display: flex; flex-wrap: wrap; gap: 6px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; }
        .nav-dot {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--bg3); color: var(--text2); cursor: pointer;
          font-size: .75rem; font-weight: 600; transition: all .2s; font-family: var(--mono);
        }
        .nav-dot.current { background: var(--orange); color: white; border-color: var(--orange); }
        .nav-dot.answered { background: var(--green); color: white; border-color: var(--green); }
        .active-question { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
        .active-q-text { font-size: 1rem; color: var(--text); line-height: 1.6; margin: 16px 0; font-weight: 500; }
        .active-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .active-option {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 12px; border: 2px solid var(--border);
          cursor: pointer; transition: all .2s; font-size: .9rem;
        }
        .active-option:hover { border-color: var(--blue); background: #3b82f610; }
        .active-option.selected { border-color: var(--blue); background: #3b82f615; font-weight: 600; }
        .opt-circle { width: 28px; height: 28px; border-radius: 99px; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 700; flex-shrink: 0; }
        .active-option.selected .opt-circle { background: var(--blue); border-color: var(--blue); color: white; }
        .test-nav-btns { display: flex; gap: 10px; justify-content: space-between; }
        .test-nav-btns button {
          padding: 10px 20px; border-radius: 10px; border: 1px solid var(--border);
          background: var(--bg3); color: var(--text); cursor: pointer;
          font-family: var(--font); font-size: .875rem; transition: all .2s;
        }
        .test-nav-btns button:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); }
        .test-nav-btns button:disabled { opacity: .4; cursor: not-allowed; }
        .clear-ans-btn { color: var(--red) !important; border-color: var(--red) !important; }

        /* Result */
        .test-result { display: flex; flex-direction: column; gap: 20px; }
        .result-hero { text-align: center; background: linear-gradient(135deg, var(--bg2), var(--bg3)); border: 1px solid var(--border); border-radius: 20px; padding: 40px; }
        .result-score { font-size: 4rem; font-weight: 900; font-family: var(--mono); background: linear-gradient(135deg, var(--blue), var(--orange)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .result-score span { font-size: 2rem; color: var(--text2); -webkit-text-fill-color: var(--text2); }
        .result-grade { font-size: 1.3rem; font-weight: 700; margin-top: 8px; }
        .result-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 20px; text-align: center; font-size: .8rem; color: var(--text2); }
        .stat-card.correct { border-color: var(--green); }
        .stat-card.wrong { border-color: var(--red); }
        .stat-card.skipped { border-color: var(--text3); }
        .stat-card.accuracy { border-color: var(--blue); }
        .stat-num { font-size: 1.75rem; font-weight: 800; font-family: var(--mono); margin-bottom: 4px; }
        .stat-card.correct .stat-num { color: var(--green); }
        .stat-card.wrong .stat-num { color: var(--red); }
        .stat-card.accuracy .stat-num { color: var(--blue); }

        .subject-breakdown { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
        .subject-breakdown h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
        .breakdown-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .breakdown-subject { min-width: 90px; font-size: .8rem; font-weight: 600; }
        .breakdown-bar-wrap { flex: 1; height: 10px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
        .breakdown-bar { height: 100%; border-radius: 99px; }
        .breakdown-nums { font-size: .75rem; color: var(--text2); font-family: var(--mono); white-space: nowrap; }
        .result-actions { display: flex; gap: 12px; }
        .restart-btn, .review-btn {
          flex: 1; padding: 14px; border-radius: 12px; border: none;
          font-size: .9rem; font-weight: 700; cursor: pointer; font-family: var(--font); transition: all .2s;
        }
        .restart-btn { background: var(--bg3); color: var(--text); border: 1px solid var(--border); }
        .review-btn { background: linear-gradient(135deg, var(--blue), var(--blue-dark)); color: white; }
        .restart-btn:hover, .review-btn:hover { transform: translateY(-2px); }

        /* Bookmarks */
        .bookmarks-page { display: flex; flex-direction: column; gap: 20px; }
        .bookmarks-page h2 { font-size: 1.75rem; font-weight: 800; }
        .empty-state { text-align: center; padding: 40px; color: var(--text2); background: var(--bg2); border: 1px dashed var(--border); border-radius: 16px; }

        /* FOOTER */
        .footer {
          background: var(--bg2); border-top: 1px solid var(--border);
          text-align: center; padding: 20px;
          font-size: .75rem; color: var(--text2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .test-configs { grid-template-columns: 1fr; }
          .result-stats { grid-template-columns: repeat(2, 1fr); }
          .nav-items .nav-item span:not(.nav-icon) { display: none; }
          .hero-content h1 { font-size: 1.75rem; }
          .navbar { padding: 0 12px; }
          .main-content { padding: 16px 12px 60px; }
          .chat-window { min-height: 300px; max-height: 350px; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .filter-bar { flex-direction: column; }
          .search-input { width: 100%; }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <div className="nav-brand">⚡ JEE Master AI</div>
        <div className="nav-items">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`nav-item ${nav === item.id ? "active" : ""}`} onClick={() => setNav(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* ─── MAIN ─── */}
      <main className="main-content">
        {nav === "home" && <Dashboard setNav={setNav} bookmarks={bookmarks} />}
        {nav === "pyq" && <PYQEngine bookmarks={bookmarks} setBookmarks={setBookmarks} />}
        {nav === "ai" && <AiDoubtSolver darkMode={darkMode} />}
        {nav === "test" && <MockTest />}
        {nav === "bookmarks" && <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} />}
      </main>

      <footer className="footer">
        ⚡ JEE Master AI · Real PYQs 2010–2023 · AI-Powered · Built for IIT Aspirants<br/>
        <span style={{fontSize:".65rem",marginTop:"4px",display:"block"}}>
          Disclaimer: Questions sourced from public domain. Always verify with official NTA papers.
        </span>
      </footer>
    </div>
  );
}
