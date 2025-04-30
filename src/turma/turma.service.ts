import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Db } from 'mongodb';
import * as csv from 'csv-parser'; // Mantenha a importação como está
import { Readable } from 'stream';

@Injectable()
export class TurmaService {
  private turmaCollection;

  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {
    this.turmaCollection = this.db.collection('turmas');
  }

  async processCsv(file: Express.Multer.File): Promise<{ message: string }> {
    if (!file.originalname.endsWith('.csv')) {
      throw new HttpException('O arquivo deve ser um CSV.', HttpStatus.BAD_REQUEST);
    }

    const results: any[] = [];
    const buffer = file.buffer.toString('utf-8');
    const stream = Readable.from(buffer);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv.default()) // <-- Modifique aqui para acessar a função default
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          if (results.length > 0) {
            try {
              await this.turmaCollection.insertMany(results);
              resolve({ message: `${results.length} turmas inseridas com sucesso!` });
            } catch (error) {
              reject(new HttpException('Erro ao inserir dados no banco de dados.', HttpStatus.INTERNAL_SERVER_ERROR));
            }
          } else {
            reject(new HttpException('O CSV está vazio ou inválido.', HttpStatus.BAD_REQUEST));
          }
        })
        .on('error', (error) => {
          reject(new HttpException(`Erro ao processar o CSV: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
  }
}