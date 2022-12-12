import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { ProdutosService } from './produtos.service';

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

}
