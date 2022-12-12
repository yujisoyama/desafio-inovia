import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { CriarClienteDto } from './dto/criar-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clienteService: ClientesService) { }

    @Post()
    @HttpCode(201)
    async criarCliente(@Body() criarClienteDto: CriarClienteDto, @Res() res: Response) {
        try {
            const result = await this.clienteService.criarCliente(criarClienteDto);
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
    @Get('/profile')
    @HttpCode(200)
    async getClienteLogged(@Req() req: any) {
        try {
            return req.user;
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
