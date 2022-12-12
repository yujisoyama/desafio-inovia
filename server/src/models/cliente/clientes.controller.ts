import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
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
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
