<template>
  <div class="page_detail">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <Breadcrumb></Breadcrumb>
    <el-card class="mt-3 bg-white">
      <h6 class="fs_20 font-weight-normal mb-3">{{ title }}</h6>
      <el-form :model="projectForm" :rules="rules" ref="projectForm" label-width="110px" label-position="top" class="pl-3 pr-3">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门" prop="p_dept">
              <el-select v-model="projectForm.p_dept" clearable filterable placeholder="请选择部门" class="w-100" @change="deptChange">
                <el-option v-for="item in deptOptions" :key="item.wid" :label="item.name" :value="item.wid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人" prop="apply_id">
              <el-select v-model="projectForm.apply_id" clearable filterable placeholder="请选择申请人" class="w-100" @change="applyChange">
                <el-option v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="p_name">
              <el-input v-model="projectForm.p_name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别" prop="p_cate_id">
              <el-select v-model="projectForm.p_cate_id" clearable filterable placeholder="请选择项目类别" class="w-100" @change="cateChange">
                <el-option v-for="item in cateOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人">
              <div class="d-flex align-items-center">
                <el-select v-model="projectForm.leader_wid" clearable filterable placeholder="请选择负责人所在部门" class="w-100" @change="deptChange2">
                  <el-option v-for="item in deptOptions" :key="item.wid" :label="item.name" :value="item.wid"></el-option>
                </el-select>
                <el-select v-model="projectForm.leader_id" clearable filterable placeholder="请选择负责人" class="w-100 ml-3">
                  <el-option v-for="item in leaderOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请年份" prop="projecttime">
              <el-date-picker
                placeholder="请选择申请年份"
                v-model="projectForm.projecttime"
                type="year"
                class="w-100"
                value-format="yyyy"
                format="yyyy"
                @change="yearChange"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="budget_amount">
              <template slot="label">
                <span v-if="can_used_funds == 0">
                  预算金额
                  <span class="text-danger">(本年度可用项目金额不足，请联系管理员)</span>
                </span>
                <span v-else>
                  预算金额
                  <span class="text-danger">(年度可用预算 {{ can_used_funds }} 元)</span>
                </span>
              </template>
              <el-input v-model.number="projectForm.budget_amount" placeholder="请输入预算金额" :readonly="this.projectId ? true : false">
                <span slot="suffix" class="el-input__icon mr-2">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="is_open_money == 2">
            <el-form-item prop="real_amount">
              <template slot="label">
                <span v-if="can_used_funds == 0">
                  项目金额
                  <span class="text-danger">(本年度可用项目金额不足，请联系管理员)</span>
                </span>
                <span v-else>
                  项目金额
                  <span class="text-danger">(年度可用预算 {{ can_used_funds }} 元)</span>
                </span>
              </template>
              <el-input v-model.number="projectForm.real_amount" placeholder="请输入项目金额" :readonly="this.projectId ? true : false">
                <span slot="suffix" class="el-input__icon mr-2">元</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="is_need_company == 2">
            <el-form-item label="所属企业">
              <el-select v-model="projectForm.company_id" clearable placeholder="请选择所属企业" class="w-100">
                <el-option v-for="item in companyOptions" :key="item.id" :label="item.job_number" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-for="(formItem, j) in projectForm.secondFrom" :key="j">
            <!-- 字段类型:1=文本框,2=数字框,3=下拉单选,4=日期选择,5=文件上传(单选),6=文本域,7=富文本,
						8=时间选择,9=下拉多选,10=复选,11=单选,12=数组,13=图片上传(单选),14=图片上传(多选),15=文件上传(多选) -->
            <!-- 1=文本框 -->
            <el-col :span="12" v-if="formItem.name_type == 1">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-input v-model="formItem.value" :placeholder="formItem.placeholder"></el-input>
              </el-form-item>
            </el-col>
            <!-- 2=数字框 -->
            <el-col :span="12" v-else-if="formItem.name_type == 2">
              <el-form-item
                :label="formItem.title"
                :required="formItem.is_required == 2 ? true : false"
                :rules="[{ type: 'number', message: formItem.title + '必须为数字值' }]"
              >
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-input v-model.number="formItem.value" :placeholder="formItem.placeholder">
                  <span slot="suffix" class="el-input__icon mr-2">元</span>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- 3=下拉单选 -->
            <el-col :span="12" v-else-if="formItem.name_type == 3">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-select v-model="formItem.value" clearable :placeholder="formItem.placeholder" class="w-100">
                  <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 4=日期选择 -->
            <el-col :span="12" v-else-if="formItem.name_type == 4">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-date-picker
                  type="date"
                  :placeholder="formItem.placeholder"
                  v-model="formItem.value"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 5=文件上传(单选) -->
            <el-col :span="24" v-else-if="formItem.name_type == 5">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                    <span>{{ formItem.title }}</span>
                    <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                    <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                      <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                        <i class="el-icon-document mr-2"></i>
                        <span>示例下载</span>
                      </div>
                      <div class="opacity-80 ml-3">
                        <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                        <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="d-flex align-items-start justify-content-between">
                  <el-upload
                    class="my_upload"
                    drag
                    :limit="1"
                    action="void"
                    :accept="accept_file"
                    :auto-upload="true"
                    :http-request="myUpload"
                    :file-list="formItem.value"
                    :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                    :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                    :before-upload="file => beforeUpload(file, formItem)"
                    :on-exceed="onExceed"
                  >
                    <div class="el-upload__text">
                      <i class="el-icon-upload"></i>
                      将文档拖到此处，或
                      <em>点击选择文档</em>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <!-- 6=文本域 -->
            <el-col :span="24" v-else-if="formItem.name_type == 6">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-input type="textarea" v-model="formItem.value" :placeholder="formItem.placeholder" :rows="3"></el-input>
              </el-form-item>
            </el-col>
            <!-- 7=富文本 -->
            <el-col :span="24" v-else-if="formItem.name_type == 6 || formItem.name_type == 7">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <vEditor v-model="formItem.value" class="pro_vEditor"></vEditor>
              </el-form-item>
            </el-col>
            <!-- 8=时间选择 -->
            <el-col :span="12" v-else-if="formItem.name_type == 8">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-date-picker
                  type="datetime"
                  :placeholder="formItem.placeholder"
                  v-model="formItem.value"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 9=下拉多选 -->
            <el-col :span="12" v-else-if="formItem.name_type == 9">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-select v-model="formItem.value" multiple clearable :placeholder="formItem.placeholder" class="w-100">
                  <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 10=复选 -->
            <el-col :span="12" v-else-if="formItem.name_type == 10">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-checkbox-group v-model="formItem.value">
                  <template v-for="(checkbox, z) in formItem.extra_val">
                    <el-checkbox :label="checkbox" :name="formItem.name" :key="z"></el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <!-- 11=单选 -->
            <el-col :span="12" v-else-if="formItem.name_type == 11">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <span>{{ formItem.title }}</span>
                  <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                </template>
                <el-radio-group v-model="formItem.value">
                  <template v-for="(radio, z) in formItem.extra_val">
                    <el-radio :label="radio" :key="z"></el-radio>
                  </template>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- 12=数组 -->
            <el-col :span="24" v-else-if="formItem.name_type == 12">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false" class="payment_item">
                <div slot="label" class="d-flex justify-content-between">
                  <div>
                    <span>{{ formItem.title }}</span>
                    <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                  </div>
                  <span class="text-primary cursor-pointer" @click="addPro(formItem.value, formItem.extra_val)">
                    <i class="el-icon-plus mr-1"></i>
                    添加
                  </span>
                </div>
                <template v-for="(cell, INDEX) in formItem.value">
                  <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3" :key="INDEX">
                    <el-col :span="23" class="d-flex align-items-center">
                      <el-input
                        :key="x"
                        v-for="(formCol, x) in formItem.extra_val"
                        class="mr-3"
                        v-model="cell[x]"
                        :placeholder="'请输入' + formCol.title"
                      ></el-input>
                    </el-col>
                    <el-col :span="1" class="text-right">
                      <span class="text-danger cursor-pointer" @click="delField(formItem.value, INDEX)">删除</span>
                    </el-col>
                  </el-row>
                </template>
              </el-form-item>
            </el-col>
            <!-- 13=图片上传(单选) -->
            <el-col :span="24" v-else-if="formItem.name_type == 13">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                    <span>{{ formItem.title }}</span>
                    <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                    <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                      <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                        <i class="el-icon-document mr-2"></i>
                        <span>示例下载</span>
                      </div>
                      <div class="opacity-80 ml-3">
                        <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                        <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                      </div>
                    </div>
                  </div>
                </template>
                <el-upload
                  action="void"
                  :accept="accept_img"
                  :limit="1"
                  list-type="picture-card"
                  :auto-upload="true"
                  :http-request="myUpload"
                  :file-list="formItem.value"
                  :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                  :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                  :before-upload="file => beforeUpload(file, formItem)"
                  :on-exceed="onExceed"
                  :class="formItem.value.length > 0 ? 'limit_upload' : ''"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <!-- 14=图片上传(多选) -->
            <el-col :span="24" v-else-if="formItem.name_type == 14">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                    <span>{{ formItem.title }}</span>
                    <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                    <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                      <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                        <i class="el-icon-document mr-2"></i>
                        <span>示例下载</span>
                      </div>
                      <div class="opacity-80 ml-3">
                        <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                        <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                      </div>
                    </div>
                  </div>
                </template>
                <el-upload
                  action="void"
                  :accept="accept_img"
                  list-type="picture-card"
                  :auto-upload="true"
                  :http-request="myUpload"
                  :file-list="formItem.value"
                  :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                  :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                  :before-upload="file => beforeUpload(file, formItem)"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <!-- 15=文件上传(多选) -->
            <el-col :span="24" v-else-if="formItem.name_type == 15">
              <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                <template slot="label">
                  <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                    <span>{{ formItem.title }}</span>
                    <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                    <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                      <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                        <i class="el-icon-document mr-2"></i>
                        <span>示例下载</span>
                      </div>
                      <div class="opacity-80 ml-3">
                        <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                        <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="d-flex align-items-start justify-content-between">
                  <el-upload
                    class="my_upload"
                    drag
                    action="void"
                    :accept="accept_file"
                    :auto-upload="true"
                    :http-request="myUpload"
                    :file-list="formItem.value"
                    :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                    :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                    :before-upload="file => beforeUpload(file, formItem)"
                  >
                    <div class="el-upload__text">
                      <i class="el-icon-upload"></i>
                      将文档拖到此处，或
                      <em>点击选择文档</em>
                    </div>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row :gutter="20" v-if="initType == 2">
          <!-- 合同规定付款计划 -->
          <el-col :span="24" v-if="is_open_money == 2 && !this.projectId">
            <el-form-item label="合同规定付款计划" class="payment_item">
              <div slot="label" class="d-flex justify-content-between">
                <span>合同规定付款计划</span>
                <span class="text-primary cursor-pointer" @click="addPay(projectForm.agree_payinfo)">
                  <i class="el-icon-plus mr-1"></i>
                  付款信息
                </span>
              </div>
              <template v-for="(cell, INDEX) in projectForm.agree_payinfo">
                <div :key="INDEX" class="mb-3 agree_pay_more_cell">
                  <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3">
                    <el-col :span="24">
                      <el-input v-model="cell.title" placeholder="请输入标题"></el-input>
                    </el-col>
                    <el-col :span="24">
                      <el-input v-model.number="cell.money" placeholder="请输入金额，必须为数值">
                        <span slot="suffix" class="el-input__icon mr-2">元</span>
                      </el-input>
                    </el-col>
                    <el-col :span="24">
                      <el-date-picker
                        type="date"
                        placeholder="选择付款节点"
                        clearable
                        v-model="cell.paytime"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="2" class="text-right">
                      <span class="text-danger cursor-pointer" @click="delpayField(projectForm.agree_payinfo, INDEX)">删除</span>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <!-- 流程们 -->
          <template v-for="(process, z) in projectForm.processForms">
            <!-- 流程类型 node_id = 1 项目初审 （不需要添加额外字段）；node_id = 2 项目评审；node_id = 6 项目实施；node_id = 10 项目验收；node_id = 11 项目维保（暂时不处理）  -->
            <!-- 评审记录 -->
            <div v-if="process.node_id == 2" :key="z" class="project_form">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3 mt-3">评审记录</h4>
                <span class="text-primary cursor-pointer" @click="addRecheckItem(recheckForm)">
                  <i class="el-icon-circle-plus-outline mr-1"></i>
                  评审记录
                </span>
              </div>
              <div v-for="(recheckItem, reIndex) in recheckForm" :key="reIndex" class="project_form_recheck">
                <div class="d-flex align-items-center pb-2" v-if="recheckForm.length > 1">
                  <span class="recheck_index_title fs_16">记录 {{ reIndex + 1 }} :</span>
                  <span class="text-danger cursor-pointer ml-3" @click="delRecheckItem(recheckForm, reIndex)"><i class="el-icon-remove-outline mr-1"></i></span>
                </div>
                <el-form :model="recheckItem" :rules="recheckRules" ref="recheckForm" label-width="110px" label-position="top" class="pl-3 pr-3">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-form-item label="评审状态" class="payment_item" required prop="sendjson">
                        <div slot="label" class="d-flex justify-content-between">
                          <span>评审状态</span>
                          <span class="text-primary cursor-pointer" @click="addRecheckPro(recheckItem.sendjson)">
                            <i class="el-icon-plus mr-1"></i>
                            评审状态
                          </span>
                        </div>
                        <template v-for="(cell, INDEX) in recheckItem.sendjson">
                          <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3" :key="INDEX">
                            <el-col :span="24">
                              <el-select v-model="cell.expert_id" placeholder="请选择专家" class="w-100" clearable @change="changeCheck">
                                <el-option v-for="item in expertOptions" :key="item.id" :label="item.e_name" :value="item.id"></el-option>
                              </el-select>
                            </el-col>
                            <el-col :span="24">
                              <el-select v-model="cell.is_pass" clearable placeholder="请选择是否通过" class="w-100">
                                <el-option label="通过" value="1"></el-option>
                                <el-option label="不通过" value="2"></el-option>
                              </el-select>
                            </el-col>
                            <el-col :span="24">
                              <el-input type="textarea" v-model="cell.content" placeholder="请输入评审意见" :rows="1"></el-input>
                            </el-col>
                            <el-col :span="2" class="text-right">
                              <span class="text-danger cursor-pointer" @click="delRecheckField(recheckItem.sendjson, INDEX)">删除</span>
                            </el-col>
                          </el-row>
                        </template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="评审日期" prop="recheck_date">
                        <el-date-picker
                          type="date"
                          placeholder="请选择评审日期"
                          v-model="recheckItem.recheck_date"
                          value-format="yyyy-MM-dd"
                          clearable
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="评审内容" prop="content">
                        <el-input type="textarea" v-model="recheckItem.content" placeholder="请输入评审内容" :rows="3"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <!-- 评审流程的额外参数 -->
                  <el-row :gutter="20">
                    <div v-for="(formItem, j) in recheckItem.recheckExtraForms" :key="j">
                      <!-- 字段类型:1=文本框,2=数字框,3=下拉单选,4=日期选择,5=文件上传(单选),6=文本域,7=富文本,
											8=时间选择,9=下拉多选,10=复选,11=单选,12=数组,13=图片上传(单选),14=图片上传(多选),15=文件上传(多选) -->
                      <!-- 1=文本框 -->
                      <el-col :span="12" v-if="formItem.name_type == 1">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-input v-model="formItem.value" :placeholder="formItem.placeholder"></el-input>
                        </el-form-item>
                      </el-col>
                      <!-- 2=数字框 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 2">
                        <el-form-item
                          :label="formItem.title"
                          :required="formItem.is_required == 2 ? true : false"
                          :rules="[{ type: 'number', message: formItem.title + '必须为数字值' }]"
                        >
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-input v-model="formItem.value" :placeholder="formItem.placeholder">
                            <span slot="suffix" class="el-input__icon mr-2">元</span>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <!-- 3=下拉单选 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 3">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-select v-model="formItem.value" clearable :placeholder="formItem.placeholder" class="w-100">
                            <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <!-- 4=日期选择 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 4">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-date-picker
                            type="date"
                            :placeholder="formItem.placeholder"
                            v-model="formItem.value"
                            value-format="yyyy-MM-dd"
                            clearable
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <!-- 5=文件上传(单选) -->
                      <el-col :span="24" v-else-if="formItem.name_type == 5">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                              <span>{{ formItem.title }}</span>
                              <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                              <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                                <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                  <i class="el-icon-document mr-2"></i>
                                  <span>示例下载</span>
                                </div>
                                <div class="opacity-80 ml-3">
                                  <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                  <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="d-flex align-items-start justify-content-between">
                            <el-upload
                              class="my_upload"
                              drag
                              :limit="1"
                              action="void"
                              :accept="accept_file"
                              :auto-upload="true"
                              :http-request="myUploadRecheck"
                              :file-list="formItem.value"
                              :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                              :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                              :before-upload="file => beforeUpload(file, formItem)"
                              :on-exceed="onExceed"
                            >
                              <div class="el-upload__text">
                                <i class="el-icon-upload"></i>
                                将文档拖到此处，或
                                <em>点击选择文档</em>
                              </div>
                            </el-upload>
                          </div>
                        </el-form-item>
                      </el-col>
                      <!-- 6=文本域 -->
                      <el-col :span="24" v-else-if="formItem.name_type == 6">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-input type="textarea" v-model="formItem.value" :placeholder="formItem.placeholder" :rows="3"></el-input>
                        </el-form-item>
                      </el-col>
                      <!-- 7=富文本 -->
                      <el-col :span="24" v-else-if="formItem.name_type == 6 || formItem.name_type == 7">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <vEditor v-model="formItem.value" class="pro_vEditor"></vEditor>
                        </el-form-item>
                      </el-col>
                      <!-- 8=时间选择 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 8">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-date-picker
                            type="datetime"
                            :placeholder="formItem.placeholder"
                            v-model="formItem.value"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            clearable
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <!-- 9=下拉多选 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 9">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-select v-model="formItem.value" clearable multiple :placeholder="formItem.placeholder" class="w-100">
                            <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <!-- 10=复选 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 10">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-checkbox-group v-model="formItem.value">
                            <template v-for="(checkbox, z) in formItem.extra_val">
                              <el-checkbox :label="checkbox" :name="formItem.name" :key="z"></el-checkbox>
                            </template>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                      <!-- 11=单选 -->
                      <el-col :span="12" v-else-if="formItem.name_type == 11">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </template>
                          <el-radio-group v-model="formItem.value">
                            <template v-for="(radio, z) in formItem.extra_val">
                              <el-radio :label="radio" :key="z"></el-radio>
                            </template>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <!-- 12=数组 -->
                      <el-col :span="24" v-else-if="formItem.name_type == 12">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false" class="payment_item">
                          <div slot="label" class="d-flex justify-content-between">
                            <div>
                              <span>{{ formItem.title }}</span>
                              <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            </div>
                            <span class="text-primary cursor-pointer" @click="addPro(formItem.value, formItem.extra_val)">
                              <i class="el-icon-plus mr-1"></i>
                              添加
                            </span>
                          </div>
                          <template v-for="(cell, INDEX) in formItem.value">
                            <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3" :key="INDEX">
                              <el-col :span="23" class="d-flex align-items-center">
                                <el-input
                                  :key="x"
                                  v-for="(formCol, x) in formItem.extra_val"
                                  class="mr-3"
                                  v-model="cell[x]"
                                  :placeholder="'请输入' + formCol.title"
                                ></el-input>
                              </el-col>
                              <el-col :span="1" class="text-right">
                                <span class="text-danger cursor-pointer" @click="delField(formItem.value, INDEX)">删除</span>
                              </el-col>
                            </el-row>
                          </template>
                        </el-form-item>
                      </el-col>
                      <!-- 13=图片上传(单选) -->
                      <el-col :span="24" v-else-if="formItem.name_type == 13">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                              <span>{{ formItem.title }}</span>
                              <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                              <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                                <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                  <i class="el-icon-document mr-2"></i>
                                  <span>示例下载</span>
                                </div>
                                <div class="opacity-80 ml-3">
                                  <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                  <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                                </div>
                              </div>
                            </div>
                          </template>
                          <el-upload
                            action="void"
                            :accept="accept_img"
                            :limit="1"
                            list-type="picture-card"
                            :auto-upload="true"
                            :http-request="myUploadRecheck"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                            :on-exceed="onExceed"
                            :class="formItem.value.length > 0 ? 'limit_upload' : ''"
                          >
                            <i class="el-icon-plus"></i>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                      <!-- 14=图片上传(多选) -->
                      <el-col :span="24" v-else-if="formItem.name_type == 14">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                              <span>{{ formItem.title }}</span>
                              <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                              <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                                <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                  <i class="el-icon-document mr-2"></i>
                                  <span>示例下载</span>
                                </div>
                                <div class="opacity-80 ml-3">
                                  <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                  <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                                </div>
                              </div>
                            </div>
                          </template>
                          <el-upload
                            action="void"
                            :accept="accept_img"
                            list-type="picture-card"
                            :auto-upload="true"
                            :http-request="myUploadRecheck"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                          >
                            <i class="el-icon-plus"></i>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                      <!-- 15=文件上传(多选) -->
                      <el-col :span="24" v-else-if="formItem.name_type == 15">
                        <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                          <template slot="label">
                            <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                              <span>{{ formItem.title }}</span>
                              <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                              <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                                <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                  <i class="el-icon-document mr-2"></i>
                                  <span>示例下载</span>
                                </div>
                                <div class="opacity-80 ml-3">
                                  <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                  <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="d-flex align-items-start justify-content-between">
                            <el-upload
                              class="my_upload"
                              drag
                              action="void"
                              :accept="accept_file"
                              :auto-upload="true"
                              :http-request="myUploadRecheck"
                              :file-list="formItem.value"
                              :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                              :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                              :before-upload="file => beforeUpload(file, formItem)"
                            >
                              <div class="el-upload__text">
                                <i class="el-icon-upload"></i>
                                将文档拖到此处，或
                                <em>点击选择文档</em>
                              </div>
                            </el-upload>
                          </div>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                </el-form>
              </div>
            </div>

            <!-- 实施记录 -->
            <div v-else-if="process.node_id == 6" :key="z" class="project_form">
              <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3 mt-3">实施记录</h4>
              <el-form :model="runningForm" :rules="runningRules" ref="projectForm" label-width="110px" label-position="top" class="pl-3 pr-3">
                <!-- 实施流程的额外参数 -->
                <el-row :gutter="20">
                  <div v-for="(formItem, j) in runningForm.runningExtraForms" :key="j">
                    <!-- 字段类型:1=文本框,2=数字框,3=下拉单选,4=日期选择,5=文件上传(单选),6=文本域,7=富文本,
										8=时间选择,9=下拉多选,10=复选,11=单选,12=数组,13=图片上传(单选),14=图片上传(多选),15=文件上传(多选) -->
                    <!-- 1=文本框 -->
                    <el-col :span="12" v-if="formItem.name_type == 1">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input v-model="formItem.value" :placeholder="formItem.placeholder"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 2=数字框 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 2">
                      <el-form-item
                        :label="formItem.title"
                        :required="formItem.is_required == 2 ? true : false"
                        :rules="[{ type: 'number', message: formItem.title + '必须为数字值' }]"
                      >
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input v-model="formItem.value" :placeholder="formItem.placeholder">
                          <span slot="suffix" class="el-input__icon mr-2">元</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 3=下拉单选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 3">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-select v-model="formItem.value" clearable :placeholder="formItem.placeholder" class="w-100">
                          <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 4=日期选择 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 4">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-date-picker
                          type="date"
                          :placeholder="formItem.placeholder"
                          v-model="formItem.value"
                          value-format="yyyy-MM-dd"
                          clearable
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <!-- 5=文件上传(单选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 5">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <div class="d-flex align-items-start justify-content-between">
                          <el-upload
                            class="my_upload"
                            drag
                            :limit="1"
                            action="void"
                            :accept="accept_file"
                            :auto-upload="true"
                            :http-request="myUploadForce"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                            :on-exceed="onExceed"
                          >
                            <div class="el-upload__text">
                              <i class="el-icon-upload"></i>
                              将文档拖到此处，或
                              <em>点击选择文档</em>
                            </div>
                          </el-upload>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!-- 6=文本域 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 6">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input type="textarea" v-model="formItem.value" :placeholder="formItem.placeholder" :rows="3"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 7=富文本 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 6 || formItem.name_type == 7">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <vEditor v-model="formItem.value" class="pro_vEditor"></vEditor>
                      </el-form-item>
                    </el-col>
                    <!-- 8=时间选择 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 8">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-date-picker
                          type="datetime"
                          :placeholder="formItem.placeholder"
                          v-model="formItem.value"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          clearable
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <!-- 9=下拉多选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 9">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-select v-model="formItem.value" clearable multiple :placeholder="formItem.placeholder" class="w-100">
                          <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 10=复选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 10">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-checkbox-group v-model="formItem.value">
                          <template v-for="(checkbox, z) in formItem.extra_val">
                            <el-checkbox :label="checkbox" :name="formItem.name" :key="z"></el-checkbox>
                          </template>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                    <!-- 11=单选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 11">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-radio-group v-model="formItem.value">
                          <template v-for="(radio, z) in formItem.extra_val">
                            <el-radio :label="radio" :key="z"></el-radio>
                          </template>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <!-- 12=数组 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 12">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false" class="payment_item">
                        <div slot="label" class="d-flex justify-content-between">
                          <div>
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </div>
                          <span class="text-primary cursor-pointer" @click="addPro(formItem.value, formItem.extra_val)">
                            <i class="el-icon-plus mr-1"></i>
                            添加
                          </span>
                        </div>
                        <template v-for="(cell, INDEX) in formItem.value">
                          <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3" :key="INDEX">
                            <el-col :span="23" class="d-flex align-items-center">
                              <el-input
                                :key="x"
                                v-for="(formCol, x) in formItem.extra_val"
                                class="mr-3"
                                v-model="cell[x]"
                                :placeholder="'请输入' + formCol.title"
                              ></el-input>
                            </el-col>
                            <el-col :span="1" class="text-right">
                              <span class="text-danger cursor-pointer" @click="delField(formItem.value, INDEX)">删除</span>
                            </el-col>
                          </el-row>
                        </template>
                      </el-form-item>
                    </el-col>
                    <!-- 13=图片上传(单选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 13">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <el-upload
                          action="void"
                          :accept="accept_img"
                          :limit="1"
                          list-type="picture-card"
                          :auto-upload="true"
                          :http-request="myUploadForce"
                          :file-list="formItem.value"
                          :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                          :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                          :before-upload="file => beforeUpload(file, formItem)"
                          :on-exceed="onExceed"
                          :class="formItem.value.length > 0 ? 'limit_upload' : ''"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <!-- 14=图片上传(多选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 14">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <el-upload
                          action="void"
                          :accept="accept_img"
                          list-type="picture-card"
                          :auto-upload="true"
                          :http-request="myUploadForce"
                          :file-list="formItem.value"
                          :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                          :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                          :before-upload="file => beforeUpload(file, formItem)"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <!-- 15=文件上传(多选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 15">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <div class="d-flex align-items-start justify-content-between">
                          <el-upload
                            class="my_upload"
                            drag
                            action="void"
                            :accept="accept_file"
                            :auto-upload="true"
                            :http-request="myUploadForce"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                          >
                            <div class="el-upload__text">
                              <i class="el-icon-upload"></i>
                              将文档拖到此处，或
                              <em>点击选择文档</em>
                            </div>
                          </el-upload>
                        </div>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-form>
            </div>

            <!-- 验收记录 -->
            <div v-else-if="process.node_id == 10" :key="z" class="project_form">
              <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3 mt-3">验收记录</h4>
              <!-- 审核内容的表格 -->
              <div class="accept_info" v-if="acceptInfo.length > 0">
                <div class="accept_info_header fs_16 text-center font-weight-black">
                  <el-row type="flex" align="middle">
                    <el-col :span="18">
                      <div class="p-2">审核内容</div>
                    </el-col>
                    <el-col :span="3">
                      <div class="p-2">执行情况</div>
                    </el-col>
                    <el-col :span="3">
                      <div class="p-2">审核人</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="accept_info_content">
                  <template v-for="(item, index) in acceptInfo">
                    <el-row :key="index" type="flex" align="middle">
                      <el-col :span="6">
                        <div class="p-2 text-center">{{ item.group_name }}</div>
                      </el-col>
                      <el-col :span="18">
                        <template v-for="(cell, j) in item.group_list">
                          <el-row type="flex" :key="j">
                            <el-col :span="16">
                              <div class="p-2">{{ j + 1 }}、 {{ cell.title }}</div>
                            </el-col>
                            <el-col :span="4">
                              <div class="p-2">
                                <el-input v-model="cell.desc" placeholder="请输入执行情况"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="p-2">
                                <el-input v-model="cell.checkname" placeholder="请输入审核人"></el-input>
                              </div>
                            </el-col>
                          </el-row>
                        </template>
                      </el-col>
                    </el-row>
                  </template>
                </div>
              </div>

              <el-form :model="acceptForm" ref="acceptForm" label-width="110px" label-position="top" class="pl-3 pr-3">
                <!-- 验收流程的额外参数 -->
                <el-row :gutter="20">
                  <div v-for="(formItem, j) in acceptForm.acceptExtraForms" :key="j">
                    <!-- 字段类型:1=文本框,2=数字框,3=下拉单选,4=日期选择,5=文件上传(单选),6=文本域,7=富文本,
										8=时间选择,9=下拉多选,10=复选,11=单选,12=数组,13=图片上传(单选),14=图片上传(多选),15=文件上传(多选) -->
                    <!-- 1=文本框 -->
                    <el-col :span="12" v-if="formItem.name_type == 1">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input v-model="formItem.value" :placeholder="formItem.placeholder"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 2=数字框 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 2">
                      <el-form-item
                        :label="formItem.title"
                        :required="formItem.is_required == 2 ? true : false"
                        :rules="[{ type: 'number', message: formItem.title + '必须为数字值' }]"
                      >
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input v-model="formItem.value" :placeholder="formItem.placeholder">
                          <span slot="suffix" class="el-input__icon mr-2">元</span>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 3=下拉单选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 3">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-select v-model="formItem.value" clearable :placeholder="formItem.placeholder" class="w-100">
                          <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 4=日期选择 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 4">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-date-picker
                          type="date"
                          :placeholder="formItem.placeholder"
                          v-model="formItem.value"
                          value-format="yyyy-MM-dd"
                          clearable
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <!-- 5=文件上传(单选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 5">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <div class="d-flex align-items-start justify-content-between">
                          <el-upload
                            class="my_upload"
                            drag
                            :limit="1"
                            action="void"
                            :accept="accept_file"
                            :auto-upload="true"
                            :http-request="myUploadAccept"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                            :on-exceed="onExceed"
                          >
                            <div class="el-upload__text">
                              <i class="el-icon-upload"></i>
                              将文档拖到此处，或
                              <em>点击选择文档</em>
                            </div>
                          </el-upload>
                        </div>
                      </el-form-item>
                    </el-col>
                    <!-- 6=文本域 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 6">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-input type="textarea" v-model="formItem.value" :placeholder="formItem.placeholder" :rows="3"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 7=富文本 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 6 || formItem.name_type == 7">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <vEditor v-model="formItem.value" class="pro_vEditor"></vEditor>
                      </el-form-item>
                    </el-col>
                    <!-- 8=时间选择 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 8">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-date-picker
                          type="datetime"
                          :placeholder="formItem.placeholder"
                          v-model="formItem.value"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          clearable
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <!-- 9=下拉多选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 9">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-select v-model="formItem.value" clearable multiple :placeholder="formItem.placeholder" class="w-100">
                          <el-option v-for="item in formItem.extra_val" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 10=复选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 10">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-checkbox-group v-model="formItem.value">
                          <template v-for="(checkbox, z) in formItem.extra_val">
                            <el-checkbox :label="checkbox" :name="formItem.name" :key="z"></el-checkbox>
                          </template>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                    <!-- 11=单选 -->
                    <el-col :span="12" v-else-if="formItem.name_type == 11">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <span>{{ formItem.title }}</span>
                          <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                        </template>
                        <el-radio-group v-model="formItem.value">
                          <template v-for="(radio, z) in formItem.extra_val">
                            <el-radio :label="radio" :key="z"></el-radio>
                          </template>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <!-- 12=数组 -->
                    <el-col :span="24" v-else-if="formItem.name_type == 12">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false" class="payment_item">
                        <div slot="label" class="d-flex justify-content-between">
                          <div>
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                          </div>
                          <span class="text-primary cursor-pointer" @click="addPro(formItem.value, formItem.extra_val)">
                            <i class="el-icon-plus mr-1"></i>
                            添加
                          </span>
                        </div>
                        <template v-for="(cell, INDEX) in formItem.value">
                          <el-row type="flex" align="middle" :gutter="20" class="cell_row mb-3" :key="INDEX">
                            <el-col :span="23" class="d-flex align-items-center">
                              <el-input
                                :key="x"
                                v-for="(formCol, x) in formItem.extra_val"
                                class="mr-3"
                                v-model="cell[x]"
                                :placeholder="'请输入' + formCol.title"
                              ></el-input>
                            </el-col>
                            <el-col :span="1" class="text-right">
                              <span class="text-danger cursor-pointer" @click="delField(formItem.value, INDEX)">删除</span>
                            </el-col>
                          </el-row>
                        </template>
                      </el-form-item>
                    </el-col>
                    <!-- 13=图片上传(单选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 13">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <el-upload
                          action="void"
                          :accept="accept_img"
                          :limit="1"
                          list-type="picture-card"
                          :auto-upload="true"
                          :http-request="myUploadAccept"
                          :file-list="formItem.value"
                          :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                          :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                          :before-upload="file => beforeUpload(file, formItem)"
                          :on-exceed="onExceed"
                          :class="formItem.value.length > 0 ? 'limit_upload' : ''"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <!-- 14=图片上传(多选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 14">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <el-upload
                          action="void"
                          :accept="accept_img"
                          list-type="picture-card"
                          :auto-upload="true"
                          :http-request="myUploadAccept"
                          :file-list="formItem.value"
                          :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                          :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                          :before-upload="file => beforeUpload(file, formItem)"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <!-- 15=文件上传(多选) -->
                    <el-col :span="24" v-else-if="formItem.name_type == 15">
                      <el-form-item :label="formItem.title" :required="formItem.is_required == 2 ? true : false">
                        <template slot="label">
                          <div class="d-inline-flex align-items-center justify-content-between" v-if="formItem.example">
                            <span>{{ formItem.title }}</span>
                            <span class="ml-1 text-danger" v-if="formItem.remark">({{ formItem.remark }})</span>
                            <div class="d-flex align-items-center justify-content-between ml-5 text-primary">
                              <div class="cursor-pointer view" @click="downloadview(formItem.example)">
                                <i class="el-icon-document mr-2"></i>
                                <span>示例下载</span>
                              </div>
                              <div class="opacity-80 ml-3">
                                <!-- <i class="el-icon-view cursor-pointer view mr-3" @click="preview(formItem.example)"></i> -->
                                <i class="el-icon-download cursor-pointer view" @click="downloadview(formItem.example)"></i>
                              </div>
                            </div>
                          </div>
                        </template>
                        <div class="d-flex align-items-start justify-content-between">
                          <el-upload
                            class="my_upload"
                            drag
                            action="void"
                            :accept="accept_file"
                            :auto-upload="true"
                            :http-request="myUploadAccept"
                            :file-list="formItem.value"
                            :on-success="(res, file, fileList) => handleSuccess(res, file, fileList, formItem)"
                            :on-remove="(file, fileList) => handleRemove(file, fileList, formItem)"
                            :before-upload="file => beforeUpload(file, formItem)"
                          >
                            <div class="el-upload__text">
                              <i class="el-icon-upload"></i>
                              将文档拖到此处，或
                              <em>点击选择文档</em>
                            </div>
                          </el-upload>
                        </div>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-form>
            </div>
          </template>
        </el-row>
        <div class="d-flex justify-content-end">
          <el-button type="primary" @click="submitForm('projectForm')">确 定</el-button>
          <el-button @click="closedEdit">取 消</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import GlobalTips from '@/components/GlobalTips';
import Breadcrumb from '@/components/Breadcrumb';
import vEditor from '@/components/quill-editor/ue';
export default {
  name: 'ProjectEditComplete',
  data() {
    return {
      initType: 1,
      projectId: '',
      title: '新增完成项目',
      accept: '.pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.png,.JPEG',
      accept_file: '.pdf,.doc,.docx,.xls,.xlsx,.zip',
      accept_img: '.jpg,.png,.JPEG',
      deptOptions: [],
      userOptions: [],
      cateOptions: [],
      companyOptions: [],
      leaderOptions: [],
      projectForm: {
        apply_number: '',
        p_dept: '',
        apply_id: '',
        p_cate_id: '',
        leader_wid: '',
        leader_id: '',
        p_name: '',
        projecttime: this.$moment(new Date()).format('YYYY'),
        budget_amount: '',
        real_amount: '',
        company_id: '',
        secondFrom: {},
        // 以下是完成项目的增加字段
        agree_payinfo: [
          {
            title: '',
            money: '',
            paytime: '',
          },
        ],
        processForms: [],
      },
      is_need_company: '1', // 是否开启企业选择
      is_open_money: '1', // 是否开启金额申请
      can_used_funds: '',
      removeFilesArr: [],
      startOption: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      rules: {
        p_dept: [{ required: true, message: '请选择可用部门', trigger: 'change' }],
        apply_id: [{ required: true, message: '请选择教师', trigger: 'change' }],
        p_cate_id: [{ required: true, message: '请选择项目类别', trigger: 'change' }],
        p_name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        is_commit: [{ required: true, message: '请选择项目设置状态', trigger: 'change' }],
        projecttime: [{ required: true, message: '请选择申请年份', trigger: 'change' }],
        budget_amount: [
          { required: true, message: '请输入预算金额', trigger: 'blur' },
          { validator: this.commonJs.checkNumber, trigger: 'blur' },
        ],
        real_amount: [
          { required: true, message: '请输入项目金额', trigger: 'blur' },
          { validator: this.commonJs.checkNumber, trigger: 'blur' },
        ],
        company_id: [{ required: true, message: '请选择合作企业', trigger: 'change' }],
      },

      // 项目评审
      expertOptions: [],
      recheckForm: [
        {
          sendjson: [{}],
          recheck_date: '',
          content: '',
          recheckExtraForms: [],
        },
      ],
      recheckRules: {
        sendjson: [{ required: true, message: '请选择评审状态', trigger: 'change' }],
        recheck_date: [{ required: true, message: '请选择评审日期', trigger: 'change' }],
        content: [{ required: true, message: '请输入评审内容', trigger: 'blur' }],
      },

      // 项目实施
      runningForm: {
        runningExtraForms: [],
      },
      runningRules: {},

      // 项目验收
      acceptInfo: [],
      acceptForm: {
        acceptExtraForms: [],
      },
    };
  },
  components: {
    GlobalTips,
    Breadcrumb,
    vEditor,
  },
  mounted() {
    this.openEdit();
  },
  methods: {
    // 获取部门
    initDept() {
      this.$api.p_project_dept({}).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          this.deptOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 部门下拉选择
    deptChange(value) {
      this.initDeptUser(value);
    },
    // 获取教师
    initDeptUser(id) {
      this.$api
        .p_project_dept_user({
          wid: id,
        })
        .then(data => {
          if (data.code == 0) {
            // 回调成功的方法
            this.userOptions = data.data;
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    // 教师选择后取job_number
    applyChange(val) {
      let obj = {};
      obj = this.userOptions.find(item => {
        //这里的userOptions就是上面遍历的数据源
        return item.id === val; //筛选出匹配数据
      });
      var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000; // 四位随机数
      var number = this.$moment(new Date()).format('YYYYMMDDHHss');
      this.projectForm.apply_number = obj.job_number + '_' + number + '_' + randnum;
    },

    // 负责人所在部门选择
    deptChange2(value) {
      this.projectForm.leader_id = '';
      this.initLeader(value);
    },
    // 获取负责人列表
    initLeader(id) {
      this.$api
        .p_project_dept_user({
          wid: id,
        })
        .then(data => {
          if (data.code == 0) {
            // 回调成功的方法
            this.leaderOptions = data.data;
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 获取项目分类
    initCate() {
      this.$api.p_project_cate({}).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          this.cateOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取企业列表
    initCompany() {
      this.$api.p_project_company({}).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          this.companyOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取表单
    initProjectForms(id, year) {
      this.$api
        .p_project_cate_forms({
          p_cate_id: id,
          years: year,
        })
        .then(data => {
          if (data.code == 0) {
            // 回调成功的方法
            var datajson = data.data.forms_list;
            datajson.map(item => {
              if (item.name_type == 12) {
                if (this.commonJs.isEmpty(item.value)) {
                  item.value = [{}];
                }
              }
            });
            this.projectForm.secondFrom = datajson;

            this.is_need_company = data.data.is_need_company;
            this.is_open_money = data.data.is_open_money;
            this.can_used_funds = data.data.can_used_funds;

            // 流程
            if (data.data.flow_node_list.code == 0) {
              this.projectForm.processForms = data.data.flow_node_list.data;
              this.projectForm.processForms.forEach((process, indx) => {
                if (process.node_id == 2) {
                  this.initExpert();
                  this.getNodeExtra_recheck();
                } else if (process.node_id == 6) {
                  this.getNodeExtra_running();
                } else if (process.node_id == 10) {
                  this.getAcceptInfo(id);
                  this.getNodeExtra_accept();
                }
              });
            } else {
              this.$message.error(data.data.flow_node_list.msg);
            }
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 编辑的时候获取表单
    initProjectForms_edit(id, year) {
      this.$api
        .p_project_cate_forms({
          p_cate_id: id,
          years: year,
          id: this.projectId,
          type: 1, // 项目编辑type = 1;后边的维保编辑，type = 2
        })
        .then(data => {
          if (data.code == 0) {
            // 回调成功的方法
            this.is_need_company = data.data.is_need_company;
            this.is_open_money = data.data.is_open_money;
            this.can_used_funds = data.data.can_used_funds;

            if (data.data.flow_node_list.code == 0) {
              this.projectForm.processForms = data.data.flow_node_list.data;
              this.projectForm.processForms.forEach((process, indx) => {
                if (process.node_id == 2) {
                  this.initExpert();
                }
              });
            } else {
              this.$message.error(data.data.flow_node_list.msg);
            }
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 项目分类change
    cateChange(value) {
      if (this.projectId) {
        // 编辑
        this.initProjectForms_edit(value, this.projectForm.projecttime);
      } else {
        // 新增
        this.initProjectForms(value, this.projectForm.projecttime);
      }

      this.projectForm.secondFrom = {};
      this.projectForm.processForms = [];

      this.$api
        .p_getExtraNode({
          id: 2,
        })
        .then(data => {
          if (data.code == 0) {
            var recheckExtraForms = data.data;
            recheckExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                item.value = [];
                if (!this.commonJs.isEmpty(item.file_arr)) {
                  item.value = item.file_arr;
                }
              }
            });
            // 项目评审
            this.recheckForm = [
              {
                sendjson: [{}],
                recheck_date: '',
                content: '',
                recheckExtraForms: recheckExtraForms,
              },
            ];
          } else {
            this.$message.error(data.msg);
          }
        });

      this.runningForm = {
        runningExtraForms: [],
      };
      // 项目验收
      this.acceptInfo = [];
      this.acceptForm = {
        acceptExtraForms: [],
      };
    },
    // 年份change
    yearChange(value) {
      if (this.projectId) {
        // 编辑
        this.initProjectForms_edit(this.projectForm.p_cate_id, value);
      } else {
        // 新增
        this.initProjectForms(this.projectForm.p_cate_id, value);
      }
    },
    // 添加合同规定付款计划
    addPay(item) {
      item.push({
        title: '',
        money: '',
        paytime: '',
      });
    },
    // 删除字段
    delpayField(item, index) {
      item.splice(index, 1);
    },

    // 添加
    addPro(item, length) {
      var array = new Array();
      for (var i = 0; i < length.length; i++) {
        array.push('');
      }
      item.push(array);
    },
    // 删除字段
    delField(item, index) {
      item.splice(index, 1);
    },
    blurChange(cell) {
      // 清空已选人员
      cell.check_ids = [];
    },
    // dialog初始化
    openEdit() {
      this.projectId = this.$route.query.id;
      this.initType = this.$route.query.type;
      this.initDept();
      this.initCate();
      this.initCompany();
      if (this.projectId) {
        this.title = '编辑项目';
        this.$api
          .p_projectEdit({
            id: this.projectId,
            function_type: 1,
          })
          .then(data => {
            if (data.code == 0) {
              this.projectForm.apply_number = data.data.info.apply_number;
              this.projectForm.p_dept = data.data.info.p_dept;
              this.deptChange(this.projectForm.p_dept);
              this.projectForm.apply_id = data.data.info.apply_id;
              this.projectForm.p_name = data.data.info.p_name;
              this.projectForm.p_cate_id = data.data.info.p_cate_id;
              this.projectForm.leader_wid = data.data.info.wid;
              this.deptChange2(data.data.info.wid);
              this.projectForm.leader_id = data.data.info.leader_id;
              this.projectForm.projecttime = data.data.info.projecttime.toString();
              this.projectForm.budget_amount = data.data.info.budget_amount;
              this.projectForm.real_amount = data.data.info.real_amount;
              this.projectForm.company_id = data.data.info.company_id;
              // 获取预算
              this.initProjectForms_edit(this.projectForm.p_cate_id, this.projectForm.projecttime);
              // 展示详细信息
              var datajson = data.data.info.datajson;
              datajson.map(item => {
                if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                  item.value = [];
                  if (!this.commonJs.isEmpty(item.file_arr)) {
                    item.value = item.file_arr;
                  }
                }
                if (item.name_type == 12) {
                  return;
                }
              });
              this.projectForm.secondFrom = datajson;

              // 以下是完成项目的增加字段
              if (data.data.pay_info.length > 0) {
                this.initType = 2;
                // 合同规定付款计划
                this.projectForm.agree_payinfo = data.data.pay_info;
                // 评审
                this.recheckForm = data.data.recheck_info.map((item, index) => {
                  var recheckjson = item.extrajson;
                  recheckjson.map(item2 => {
                    if (item2.name_type == 5 || item2.name_type == 13 || item2.name_type == 14 || item2.name_type == 15) {
                      item2.value = [];
                      if (!this.commonJs.isEmpty(item2.file_arr)) {
                        item2.value = item2.file_arr;
                      }
                    }
                  });
                  return {
                    sendjson: item.recheck_detail,
                    recheck_date: item.recheck_date,
                    content: item.content,
                    recheckExtraForms: recheckjson,
                  };
                });

                // 实施
                var runningExtraForms = data.data.info.runningextra;
                runningExtraForms.map(item => {
                  if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                    item.value = [];
                    if (!this.commonJs.isEmpty(item.file_arr)) {
                      item.value = item.file_arr;
                    }
                  }
                });
                this.runningForm.runningExtraForms = runningExtraForms;
                // 验收
                this.acceptInfo = data.data.project_accept_info.accept_info;

                var acceptExtraForms = data.data.info.acceptextra;
                acceptExtraForms.map(item => {
                  if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                    item.value = [];
                    if (!this.commonJs.isEmpty(item.file_arr)) {
                      item.value = item.file_arr;
                    }
                  }
                });
                this.acceptForm.acceptExtraForms = acceptExtraForms;
              } else {
                this.initType = 1;
              }
            } else {
              this.$message.error(data.msg);
            }
          });
      } else {
        if (this.initType == 1) {
          this.title = '新增初始项目';
        } else {
          this.title = '新增完成项目';
        }
      }
    },
    // 关闭编辑
    closedEdit() {
      this.$router.go(-1); //返回上一层
      this.fileList = [];
      this.removeFilesArr = [];
    },
    // form提交
    submitForm(formName) {
      var _this = this;
      var payArr = new Array();
      var ispayArr = this.commonJs.isEmpty(this.projectForm.agree_payinfo[0]);
      if (!ispayArr) {
        payArr = this.projectForm.agree_payinfo;
      } else {
        payArr = [];
      }
      var senddata = new Array();
      var isArr = this.commonJs.isEmpty(this.projectForm.secondFrom);
      if (!isArr) {
        senddata = this.projectForm.secondFrom.map(item => {
          if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
            var nameArray = item.value.map(file => {
              if (this.commonJs.isEmpty(file.response)) {
                return file.path;
              } else {
                return file.response.data.path;
              }
            });
            return {
              name: item.name,
              value: nameArray.join(','),
            };
          } else {
            return {
              name: item.name,
              value: item.value,
            };
          }
        });
      }
      // 评审
      var recheckFormArray = this.recheckForm.map((recheckItem, index) => {
        var recheckSendjson = new Array();
        var isArr = this.commonJs.isEmpty(recheckItem.sendjson[0]);
        if (!isArr) {
          recheckSendjson = recheckItem.sendjson;
          var sendExtra = new Array();
          var isExtraArr = this.commonJs.isEmpty(recheckItem.recheckExtraForms);
          if (!isExtraArr) {
            sendExtra = recheckItem.recheckExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                var nameArray = item.value.map(file => {
                  if (this.commonJs.isEmpty(file.response)) {
                    return file.path;
                  } else {
                    return file.response.data.path;
                  }
                });
                return {
                  name: item.name,
                  value: nameArray.join(','),
                };
              } else {
                return {
                  name: item.name,
                  value: item.value,
                };
              }
            });
          }
          return {
            sendjson: JSON.stringify(recheckSendjson),
            recheck_date: recheckItem.recheck_date,
            content: recheckItem.content,
            extrajson: JSON.stringify(sendExtra),
          };
        } else {
          return {};
        }
      });

      // 实施
      var sendRunningExtra = new Array();
      var isRunningExtraArr = this.commonJs.isEmpty(this.runningForm.runningExtraForms);
      if (!isRunningExtraArr) {
        sendRunningExtra = this.runningForm.runningExtraForms.map(item => {
          if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
            var nameArray = item.value.map(file => {
              if (this.commonJs.isEmpty(file.response)) {
                return file.path;
              } else {
                return file.response.data.path;
              }
            });
            return {
              name: item.name,
              value: nameArray.join(','),
            };
          } else {
            return {
              name: item.name,
              value: item.value,
            };
          }
        });
      }

      // 验收
      var acceptInfoJson = new Array();
      this.acceptInfo.forEach((item, index) => {
        item.group_list.map((list, j) => {
          var obj = {
            id: list.id,
            desc: list.desc,
            checkname: list.checkname,
          };
          acceptInfoJson.push(obj);
        });
      });

      var sendAcceptExtra = new Array();
      var isAcceptExtraArr = this.commonJs.isEmpty(this.acceptForm.acceptExtraForms);
      if (!isAcceptExtraArr) {
        sendAcceptExtra = this.acceptForm.acceptExtraForms.map(item => {
          if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
            var nameArray = item.value.map(file => {
              if (this.commonJs.isEmpty(file.response)) {
                return file.path;
              } else {
                return file.response.data.path;
              }
            });
            return {
              name: item.name,
              value: nameArray.join(','),
            };
          } else {
            return {
              name: item.name,
              value: item.value,
            };
          }
        });
      }

      var completeSubmitData_edit = {
        basic: {
          apply_number: this.projectForm.apply_number,
          apply_id: this.projectForm.apply_id,
          p_cate_id: this.projectForm.p_cate_id,
          leader_id: this.projectForm.leader_id,
          p_name: this.projectForm.p_name,
          projecttime: this.projectForm.projecttime,
          // budget_amount:this.projectForm.budget_amount,
          // real_amount:this.projectForm.real_amount,
          company_id: this.projectForm.company_id,
          datajson: JSON.stringify(senddata),
        },
        recheck: JSON.stringify(recheckFormArray),
        running: {
          runningextra: JSON.stringify(sendRunningExtra),
          // agree_payinfo:JSON.stringify( payArr ),
        },
        accept: {
          sendjson: JSON.stringify(acceptInfoJson),
          acceptextra: JSON.stringify(sendAcceptExtra),
        },
      };

      var completeSubmitData_add = {
        basic: {
          apply_number: this.projectForm.apply_number,
          apply_id: this.projectForm.apply_id,
          p_cate_id: this.projectForm.p_cate_id,
          leader_id: this.projectForm.leader_id,
          p_name: this.projectForm.p_name,
          projecttime: this.projectForm.projecttime,
          budget_amount: this.projectForm.budget_amount,
          real_amount: this.projectForm.real_amount,
          company_id: this.projectForm.company_id,
          datajson: JSON.stringify(senddata),
        },
        recheck: JSON.stringify(recheckFormArray),
        running: {
          runningextra: JSON.stringify(sendRunningExtra),
          agree_payinfo: JSON.stringify(payArr),
        },
        accept: {
          sendjson: JSON.stringify(acceptInfoJson),
          acceptextra: JSON.stringify(sendAcceptExtra),
        },
      };

      if (this.projectId) {
        // 编辑
        this.$api
          .p_projectEdit({
            id: this.projectId,
            function_type: 2,
            ...completeSubmitData_edit,
          })
          .then(data => {
            if (data.code == 0) {
              // this.removeFilesArr.map((path)=>{
              // 	_this.removeFile(path);
              // })
              this.$message({
                message: data.msg,
                type: 'success',
              });
              this.closedEdit();
            } else {
              this.$message.error(data.msg);
            }
          });
      } else {
        // 新增
        if (this.initType == 1) {
          // 新增初始项目
          this.$api
            .p_projectAdd({
              apply_number: this.projectForm.apply_number,
              apply_id: this.projectForm.apply_id,
              p_cate_id: this.projectForm.p_cate_id,
              leader_id: this.projectForm.leader_id,
              p_name: this.projectForm.p_name,
              projecttime: this.projectForm.projecttime,
              company_id: this.projectForm.company_id,
              budget_amount: this.projectForm.budget_amount,
              real_amount: this.projectForm.real_amount,
              senddata: JSON.stringify(senddata),
            })
            .then(data => {
              if (data.code == 0) {
                // this.removeFilesArr.map((path)=>{
                // 	_this.removeFile(path);
                // })
                this.$message({
                  message: data.msg,
                  type: 'success',
                });
                this.closedEdit();
              } else {
                this.$message.error(data.msg);
              }
            });
        } else {
          // 新增完成项目
          this.$api
            .p_project_completeAdd({
              ...completeSubmitData_add,
            })
            .then(data => {
              if (data.code == 0) {
                // this.removeFilesArr.map((path)=>{
                // 	_this.removeFile(path);
                // })
                this.$message({
                  message: data.msg,
                  type: 'success',
                });
                this.closedEdit();
              } else {
                this.$message.error(data.msg);
              }
            });
        }
      }
    },

    /****  上传  ****/
    myUpload(params) {
      // 通过 FormData 对象上传文件
      const formData = new FormData();
      formData.append('apply_number', this.projectForm.apply_number);
      formData.append('type', 'chushen');
      formData.append('file', params.file);
      formData.append('user_token', this.VueCookies.get('token'));

      this.$api.p_upload(formData).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          params.onSuccess(data);
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    /****  上传  ****/
    myUploadRecheck(params) {
      // 通过 FormData 对象上传文件
      const formData = new FormData();
      formData.append('apply_number', this.projectForm.apply_number);
      formData.append('type', 'pingshen');
      formData.append('file', params.file);
      formData.append('user_token', this.VueCookies.get('token'));

      this.$api.p_upload(formData).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          params.onSuccess(data);
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    myUploadForce(params) {
      // 通过 FormData 对象上传文件
      const formData = new FormData();
      formData.append('apply_number', this.projectForm.apply_number);
      formData.append('type', 'shishi');
      formData.append('file', params.file);
      formData.append('user_token', this.VueCookies.get('token'));

      this.$api.p_upload(formData).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          params.onSuccess(data);
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    myUploadAccept(params) {
      // 通过 FormData 对象上传文件
      const formData = new FormData();
      formData.append('apply_number', this.projectForm.apply_number);
      formData.append('type', 'yanshou');
      formData.append('file', params.file);
      formData.append('user_token', this.VueCookies.get('token'));

      this.$api.p_upload(formData).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          params.onSuccess(data);
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
      });
    },

    // 上传成功
    handleSuccess(res, file, fileList, formItem) {
      formItem.value = fileList;
    },
    // 移除上传文件
    handleRemove(file, fileList, formItem) {
      var path;
      if (file.isExist) {
        // 原先上传已存在的
        path = file.path;
      } else {
        // 刚刚上传的
        if (file.status == 'success') {
          path = file.response.data.path;
        } else {
          return false;
        }
      }
      formItem.value = fileList;
      this.$message({ message: '成功移除' + file.name, type: 'success' });

      if (this.removeFilesArr.indexOf(path) == -1) {
        this.removeFilesArr.push(path);
      }
    },

    // 删除调接口
    removeFile(path) {
      this.$api
        .p_uploadDel({
          path: path,
        })
        .then(data => {
          if (data.code == 0) {
            // this.$message.success("文件更新成功");
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 上传前验证
    beforeUpload(file, formItem) {
      var isUpload = true;
      // 验证大小等
      formItem.value.map(fff => {
        if (fff.name == file.name) {
          this.$message.warning('请不要重复上传相同文件！');
          isUpload = false;
          return;
        }
      });
      return isUpload;
    },
    // 文件超出限制
    onExceed(file, fileList) {
      this.$message.error('只能上传一个文件哦，可以先删除再重新上传！');
    },

    /****
     *  评审记录
     ****/
    // 获取专家列表
    initExpert() {
      this.$api.p_projectExpert({}).then(data => {
        if (data.code == 0) {
          // 回调成功的方法
          this.expertOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 专家选择
    changeCheck(val) {
      this.expertOptions.map(arr => {
        if (val == arr.id) {
          arr.isSelect = true;
        }
      });
      this.$set(this.expertOptions);
    },
    // 添加评审记录
    addRecheckItem(item) {
      this.$api
        .p_getExtraNode({
          id: 2,
        })
        .then(data => {
          if (data.code == 0) {
            var recheckExtraForms = data.data;
            recheckExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                item.value = [];
                if (!this.commonJs.isEmpty(item.file_arr)) {
                  item.value = item.file_arr;
                }
              }
            });
            // 项目评审
            item.push({
              sendjson: [{}],
              recheck_date: '',
              content: '',
              recheckExtraForms: recheckExtraForms,
            });
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    // 删除字段
    delRecheckItem(item, index) {
      item.splice(index, 1);
    },
    // 添加审核流程
    addRecheckPro(item) {
      item.push({});
    },
    // 删除字段
    delRecheckField(item, index) {
      item.splice(index, 1);
    },

    // 根据流程节点获取额外参数
    getNodeExtra_recheck() {
      this.$api
        .p_getExtraNode({
          id: 2,
        })
        .then(data => {
          if (data.code == 0) {
            var recheckExtraForms = data.data;
            recheckExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                item.value = [];
                if (!this.commonJs.isEmpty(item.file_arr)) {
                  item.value = item.file_arr;
                }
              }
            });
            this.recheckForm.forEach((item, index) => {
              item.recheckExtraForms = recheckExtraForms;
            });
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    /****
     *  实施记录
     ****/

    // 根据流程节点获取额外参数
    getNodeExtra_running() {
      this.$api
        .p_getExtraNode({
          id: 6,
        })
        .then(data => {
          if (data.code == 0) {
            var runningExtraForms = data.data;
            runningExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                item.value = [];
                if (!this.commonJs.isEmpty(item.file_arr)) {
                  item.value = item.file_arr;
                }
              }
            });
            this.runningForm.runningExtraForms = runningExtraForms;
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    /****
     *  验收记录
     ****/

    // 获取验收列表
    getAcceptInfo(id) {
      this.$api
        .p_getAcceptInfo({
          cate_id: id,
        })
        .then(data => {
          if (data.code == 0) {
            this.acceptInfo = data.data;
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 根据流程节点获取额外参数
    getNodeExtra_accept() {
      this.$api
        .p_getExtraNode({
          id: 10,
        })
        .then(data => {
          if (data.code == 0) {
            var acceptExtraForms = data.data;
            acceptExtraForms.map(item => {
              if (item.name_type == 5 || item.name_type == 13 || item.name_type == 14 || item.name_type == 15) {
                item.value = [];
                if (!this.commonJs.isEmpty(item.file_arr)) {
                  item.value = item.file_arr;
                }
              }
            });
            this.acceptForm.acceptExtraForms = acceptExtraForms;
          } else {
            this.$message.error(data.msg);
          }
        });
    },

    // 预览文件
    preview(path) {
      this.$api
        .file_preview({
          path: path,
        })
        .then(data => {
          if (data.code == 0) {
            let a = document.createElement('a');
            a.style = 'display: none'; // 创建一个隐藏的a标签
            a.target = '_blank';
            a.href = data.data;
            document.body.appendChild(a);
            a.click();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    // 下载文件
    downloadview(path) {
      let a = document.createElement('a');
      a.style = 'display: none'; // 创建一个隐藏的a标签
      a.download = '示例下载';
      a.href = this.$globalUrl.baseURL + path;
      document.body.appendChild(a);
      a.click(); // 触发a标签的click事件
      document.body.removeChild(a);
    },
  },
};
</script>

<style></style>
