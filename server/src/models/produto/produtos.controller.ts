import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { produtoSeed } from 'src/seeder/Produto.seed';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { ProdutosService } from './produtos.service';
import { ObjectID } from 'mongodb';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) { }

    @Post()
    @HttpCode(201)
    async criarProduto(@Body() criarProdutoDto: CriarProdutoDto, @Res() res: Response) {
        try {
            const result = await this.produtosService.criarProduto(criarProdutoDto);
            if (result instanceof CustomBadRequests) {
                return res.status(HttpStatus.BAD_REQUEST).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @HttpCode(200)
    async getAllProdutos() {
        try {
            return await this.produtosService.getAllProdutos();
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    @HttpCode(200)
    async getProdutoById(@Param('id') produtoId: string, @Res() res: Response) {
        try {
            const id = new ObjectID(produtoId);
            const result = await this.produtosService.getProdutoById(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).json({message: 'Product not found.'})
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Post('/seed')
    @HttpCode(200)
    async seedProdutos() {
        try {
            produtoSeed.map(async (seed) => {
                await this.produtosService.seedProduto(seed);
            });
            return { message: 'Seed complete' }
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
