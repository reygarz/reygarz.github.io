import { CurriculumChapter, CurriculumSection } from './types';
import { Calculator, Zap, Code, Sigma } from 'lucide-react';

export const CURRICULUM_SECTIONS: CurriculumSection[] = [
  { id: 'math', title: 'Математический Анализ', icon: Sigma, description: 'Пределы, производные, ряды' },
  { id: 'algebra', title: 'Алгебра и Геометрия', icon: Calculator, description: 'Матрицы, векторы, пространства' },
  { id: 'physics', title: 'Фундаментальная Физика', icon: Zap, description: 'Механика, термодинамика, электричество' },
  { id: 'cs', title: 'Computer Science & C++', icon: Code, description: 'Алгоритмы, ООП, архитектура' },
];

export const SAMPLE_CURRICULUM: CurriculumChapter[] = [
  // --- MATH ---
  {
    moduleId: 'math',
    id: 'math-limits',
    title: '1.1 Введение в пределы',
    content: `
# Математический анализ: Введение в пределы

Понятие предела является фундаментальным строительным блоком всего математического анализа.

## Определение (по Коши)

Пусть функция $f(x)$ определена на открытом интервале, содержащем точку $c$ (кроме, возможно, самой точки $c$), и пусть $L$ — действительное число. Утверждение:

$$ \\lim_{x \\to c} f(x) = L $$

означает, что для любого $\\epsilon > 0$ существует такое $\\delta > 0$, что если $0 < |x - c| < \\delta$, то $|f(x) - L| < \\epsilon$.
    `
  },
  {
    moduleId: 'math',
    id: 'math-derivatives',
    title: '1.2 Производная функции',
    content: `
# Производная функции

Производная характеризует скорость изменения функции в данной точке.

## Определение

$$ f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x} $$

## Таблица производных

| Функция $f(x)$ | Производная $f'(x)$ |
| :--- | :--- |
| $x^n$ | $n x^{n-1}$ |
| $\\sin(x)$ | $\\cos(x)$ |
| $e^x$ | $e^x$ |
    `
  },

  // --- ALGEBRA ---
  {
    moduleId: 'algebra',
    id: 'alg-matrices',
    title: '2.1 Матрицы и операции',
    content: `
# Линейная алгебра: Матрицы

Матрица — это таблица чисел, упорядоченных по строкам и столбцам.

## Основные операции

### Умножение матриц
Умножение матрицы $A$ ($m \\times n$) на матрицу $B$ ($n \\times p$) дает матрицу $C$ ($m \\times p$).

Элемент $c_{ij}$ вычисляется как скалярное произведение $i$-й строки $A$ на $j$-й столбец $B$:
$$ c_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj} $$
    `
  },
  {
    moduleId: 'algebra',
    id: 'alg-determinants',
    title: '2.2 Определители',
    content: `
# Определитель матрицы

Определитель (детерминант) — это скалярная величина, которая может быть вычислена для квадратной матрицы.

Для матрицы $2 \\times 2$:
$$ \\det A = ad - bc $$
    `
  },

  // --- PHYSICS ---
  {
    moduleId: 'physics',
    id: 'phys-kinematics',
    title: '3.1 Кинематика точки',
    content: `
# Механика: Кинематика

Кинематика изучает движение тел без рассмотрения причин (сил), вызывающих это движение.

## Основные формулы
$$ x = x_0 + v_0t + \\frac{1}{2}at^2 $$
$$ v = v_0 + at $$
    `
  },
  {
    moduleId: 'physics',
    id: 'phys-dynamics',
    title: '3.2 Законы Ньютона',
    content: `
# Динамика

1.  **Первый закон (Инерция):** $\\sum F = 0 \\Rightarrow v = const$
2.  **Второй закон:** $F = ma$
3.  **Третий закон:** $F_{12} = -F_{21}$
    `
  },

  // --- CS ---
  {
    moduleId: 'cs',
    id: 'cs-basics',
    title: '4.1 Синтаксис C++',
    content: `
# Введение в C++

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, JK Library!" << std::endl;
    return 0;
}
\`\`\`
    `
  },
  {
    moduleId: 'cs',
    id: 'cs-oop',
    title: '4.2 Объектно-ориентированное программирование',
    content: `
# ООП в C++

Основные принципы:
1. Инкапсуляция
2. Наследование
3. Полиморфизм

\`\`\`cpp
class Animal {
public:
    virtual void makeSound() { std::cout << "Sound"; }
};

class Dog : public Animal {
public:
    void makeSound() override { std::cout << "Woof"; }
};
\`\`\`
    `
  }
];