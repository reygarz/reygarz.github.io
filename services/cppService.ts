export interface CppResult {
  output: string;
  error: string | null;
  executionTime: number;
}

export class CppSimulator {
  static execute(code: string): Promise<CppResult> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      let outputBuffer = "";
      let errorBuffer: string | null = null;

      // Artificial delay to simulate compilation
      setTimeout(() => {
        try {
          // Very basic simulation logic
          const lines = code.split('\n');
          
          if (!code.includes('int main')) {
            throw new Error("linker error: undefined reference to `main'");
          }

          // Simulated memory
          const variables: Record<string, any> = {};

          lines.forEach(line => {
            const trimmed = line.trim();
            
            // Handle cout
            if (trimmed.startsWith('std::cout') || trimmed.startsWith('cout')) {
              const content = trimmed.split('<<');
              for (let i = 1; i < content.length; i++) {
                let part = content[i].trim();
                if (part.endsWith(';')) part = part.slice(0, -1);
                
                if (part === 'std::endl' || part === 'endl') {
                  outputBuffer += '\n';
                } else if (part.startsWith('"') && part.endsWith('"')) {
                  outputBuffer += part.slice(1, -1);
                } else if (variables[part] !== undefined) {
                  outputBuffer += variables[part];
                } else if (!isNaN(Number(part))) {
                  outputBuffer += part;
                }
              }
            }
            
            // Handle int assignment
            if (trimmed.startsWith('int ')) {
               // Very basic parser: int x = 5;
               const parts = trimmed.replace(';', '').split('=');
               if (parts.length === 2) {
                 const varName = parts[0].replace('int', '').trim();
                 const value = parts[1].trim();
                 variables[varName] = isNaN(Number(value)) ? 0 : Number(value);
               }
            }
          });

          if (outputBuffer === "") outputBuffer = "[Process completed with exit code 0]";

        } catch (e: any) {
          errorBuffer = e.message;
        }

        resolve({
          output: outputBuffer,
          error: errorBuffer,
          executionTime: performance.now() - startTime
        });
      }, 800);
    });
  }
}