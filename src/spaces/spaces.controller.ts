import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateSpaceResponseDto,
  GetSpacesResponseDto,
  UpdateSpaceDto,
  CreateSpaceDto,
  UpdateSpaceResponseDto,
} from './dto';

@Controller('api/spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new space' })
  @ApiResponse({
    status: 201,
    description: 'Space created successfully.',
    type: CreateSpaceResponseDto,
  })
  create(@Body() createSpaceDto: CreateSpaceDto) {
    return this.spacesService.create(createSpaceDto);
  }

  @ApiOperation({ summary: 'Get all spaces' })
  @ApiResponse({
    status: 200,
    description: 'List of spaces.',
    type: GetSpacesResponseDto,
  })
  @Get()
  findAll() {
    return this.spacesService.findAll();
  }

  @ApiOperation({ summary: 'Get a space by ID' })
  @ApiResponse({
    status: 200,
    description: 'Space details.',
    type: CreateSpaceResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a space by ID' })
  @ApiResponse({
    status: 200,
    description: 'Space updated successfully.',
    type: UpdateSpaceResponseDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.update(id, updateSpaceDto);
  }

  @ApiOperation({ summary: 'Delete a space by ID' })
  @ApiResponse({
    status: 200,
    description: 'Space deleted successfully.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacesService.remove(id);
  }
}
