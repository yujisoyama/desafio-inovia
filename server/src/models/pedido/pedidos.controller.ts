import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
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
            if (result instanceof CustomBadRequests) {
                return res.status(HttpStatus.BAD_REQUEST).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/cliente')
    @HttpCode(200)
    async getPedidosByCliente(@Req() req: any) {
        try {
            const result = await this.pedidosServices.getPedidosByCliente(req.user.id);
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(200)
    async getAllPedidos() {
        try {
            return await this.pedidosServices.getAllPedidos();
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:pedidoId')
    @HttpCode(200)
    async cancelPedido(@Param('pedidoId') pedidoId: number) {
        try {
            console.log(pedidoId);
            
            return await this.pedidosServices.cancelPedido(pedidoId);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
