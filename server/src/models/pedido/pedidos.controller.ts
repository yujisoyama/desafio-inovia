import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor(private pedidosServices: PedidosService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    async criarPedido(@Body() criarPedidoDto: CriarPedidoDto, @Req() req: any, @Res() res: Response) {
        try {
            const result = await this.pedidosServices.criarPedido(criarPedidoDto, req.user);
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
